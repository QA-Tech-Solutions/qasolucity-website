"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, XCircle } from "lucide-react";
import { isFailingOrFlaky, flakinessRatio, type TestAggregate } from "@/lib/quality-metrics-analysis";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function StatusBadge({ test }: { test: TestAggregate }) {
  const flaky = test.passCount > 0 && test.failCount > 0;
  if (!flaky) {
    return (
      <span className="flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-500/15 dark:text-red-400">
        <XCircle className="h-3 w-3" />
        Failing
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
      <AlertTriangle className="h-3 w-3" />
      Flaky &middot; fails {Math.round(flakinessRatio(test) * 100)}% of runs
    </span>
  );
}

export default function FailuresList() {
  const [tests, setTests] = useState<TestAggregate[] | null>(null);
  const [windowSize, setWindowSize] = useState(20);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/quality-metrics/tests?window=${windowSize}`, { cache: "no-store" });
        const data = res.ok ? ((await res.json()) as { tests: TestAggregate[] }) : { tests: [] };
        if (!cancelled) setTests(data.tests);
      } catch {
        if (!cancelled) setTests([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [windowSize]);

  const failingOrFlaky = useMemo(() => {
    if (!tests) return [];
    return tests
      .filter(isFailingOrFlaky)
      .sort((a, b) => {
        if (a.currentStatus === "failed" && b.currentStatus !== "failed") return -1;
        if (b.currentStatus === "failed" && a.currentStatus !== "failed") return 1;
        return flakinessRatio(b) - flakinessRatio(a);
      });
  }, [tests]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Failures</h1>
          <p className="mt-1 text-sm text-slate-500">
            Every test currently failing or flaky across the last {windowSize} runs.
          </p>
        </div>
        <select
          value={windowSize}
          onChange={(e) => setWindowSize(Number(e.target.value))}
          aria-label="Number of recent runs to check"
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
        >
          <option value={10}>Last 10 runs</option>
          <option value={20}>Last 20 runs</option>
          <option value={50}>Last 50 runs</option>
        </select>
      </div>

      {tests === null ? (
        <p className="mt-8 text-sm text-slate-500">Loading...</p>
      ) : failingOrFlaky.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-10 text-center dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Nothing failing or flaky in the last {windowSize} runs.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {failingOrFlaky.map((test) => (
            <div
              key={test.key}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.02]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{test.title}</p>
                  <p className="mt-1 font-mono text-xs text-slate-500">{test.file}</p>
                </div>
                <StatusBadge test={test} />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-white/10">
                  {test.project}
                </span>
                <span>
                  {test.failCount} failed / {test.runsSeen} run{test.runsSeen === 1 ? "" : "s"} seen
                </span>
                {test.lastFailedAt && <span>Last failed {formatDate(test.lastFailedAt)}</span>}
                {test.lastFailedRunId && (
                  <Link
                    href={`/dashboard/executions/${test.lastFailedRunId}`}
                    className="font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    View that run
                  </Link>
                )}
              </div>

              {test.lastError && (
                <pre className="mt-3 overflow-x-auto rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300">
                  {test.lastError}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
