import type { QualityRun, TestResult } from "./quality-metrics-store";

export interface TestAggregate {
  /** `${file}::${title}::${project}` - stable identity for one test on one project across runs. */
  key: string;
  title: string;
  file: string;
  project: TestResult["project"];
  /** Status in the most recent run that included this test. */
  currentStatus: TestResult["status"];
  runsSeen: number;
  passCount: number;
  failCount: number;
  skipCount: number;
  avgDurationMs: number;
  /** Error message from the most recent run in which this test failed, if any. */
  lastError?: string;
  /** id of the most recent run in which this test failed, if any - for linking into Executions. */
  lastFailedRunId?: string;
  /** timestamp of that run. */
  lastFailedAt?: string;
}

/**
 * Walks runs newest-to-oldest (the order getRunsFull/getRuns already
 * return) and folds every test occurrence into one aggregate per
 * (file, title, project) - the shared cross-run view Failures, Analytics,
 * and Test Explorer all render different slices of, so the walk only
 * happens once regardless of how many of those pages a request touches.
 */
export function computeTestAggregates(runs: QualityRun[]): TestAggregate[] {
  const byKey = new Map<string, TestAggregate & { durationSum: number }>();

  for (const run of runs) {
    for (const test of run.tests) {
      const key = `${test.file}::${test.title}::${test.project}`;
      const existing = byKey.get(key);

      if (!existing) {
        byKey.set(key, {
          key,
          title: test.title,
          file: test.file,
          project: test.project,
          currentStatus: test.status,
          runsSeen: 1,
          passCount: test.status === "passed" ? 1 : 0,
          failCount: test.status === "failed" ? 1 : 0,
          skipCount: test.status === "skipped" ? 1 : 0,
          durationSum: test.durationMs,
          avgDurationMs: test.durationMs,
          ...(test.status === "failed"
            ? { lastError: test.error, lastFailedRunId: run.id, lastFailedAt: run.timestamp }
            : {}),
        });
        continue;
      }

      existing.runsSeen += 1;
      existing.durationSum += test.durationMs;
      existing.avgDurationMs = Math.round(existing.durationSum / existing.runsSeen);
      if (test.status === "passed") existing.passCount += 1;
      else if (test.status === "failed") existing.failCount += 1;
      else existing.skipCount += 1;

      // Runs are walked newest-first, so the first "failed" occurrence
      // encountered for this key is already its most recent - later
      // (older) failures shouldn't overwrite it.
      if (test.status === "failed" && !existing.lastFailedRunId) {
        existing.lastError = test.error;
        existing.lastFailedRunId = run.id;
        existing.lastFailedAt = run.timestamp;
      }
    }
  }

  return [...byKey.values()].map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructured only to exclude it from `aggregate`
    ({ durationSum: _durationSum, ...aggregate }) => aggregate
  );
}

/**
 * True for tests from qasolucity-automation's admin.spec.ts - the suite
 * covering /admin/assign-voucher and /admin/voucher-log, the one part of
 * the site that touches real customer vouchers. Everything else in the
 * QA suite is about the public marketing site, so it's shown openly on
 * the dashboard as-is; admin.spec.ts results are held back for the
 * gated Admin section instead (see /dashboard/admin) rather than mixed
 * into the public Executions/Failures/Analytics/Test Explorer views.
 */
export function isAdminSuiteTest(t: Pick<TestAggregate, "file"> | Pick<TestResult, "file">): boolean {
  return t.file === "admin.spec.ts" || t.file.endsWith("/admin.spec.ts");
}

/** Currently failing, or has both a pass and a fail somewhere in the window (flaky). */
export function isFailingOrFlaky(t: TestAggregate): boolean {
  return t.currentStatus === "failed" || (t.passCount > 0 && t.failCount > 0);
}

export function flakinessRatio(t: TestAggregate): number {
  const decisive = t.passCount + t.failCount;
  return decisive === 0 ? 0 : t.failCount / decisive;
}
