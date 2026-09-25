import { Redis } from "@upstash/redis";
import { revalidateTag, unstable_cache } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { summarizeError } from "./summarize-test-error";

export interface QualityMetrics {
  passRate: number;
  passedTests: number;
  totalTests: number;
  bugs: number;
  coverage: number;
  apiHealth: "Healthy" | "Degraded";
  lastUpdated: string | null;
  source: "seed" | "automation";
}

export interface TestResult {
  /** Full title including its describe path, e.g. "contact form validation > rejects a malformed email". */
  title: string;
  /** Spec file path relative to the automation repo, e.g. "tests/contact-form.spec.ts". */
  file: string;
  project: "desktop" | "mobile";
  status: "passed" | "failed" | "skipped";
  durationMs: number;
  /** Trimmed error message, present only when status is "failed". */
  error?: string;
  /**
   * Failure artifacts uploaded to Vercel Blob by report-metrics.mjs -
   * present only when BLOB_READ_WRITE_TOKEN is configured there (see its
   * "Failure artifacts" comment) and only ever on a failed test. traceUrl
   * is meant to be opened via Playwright's hosted trace viewer:
   * `https://trace.playwright.dev/?trace=${traceUrl}`.
   */
  screenshotUrl?: string;
  videoUrl?: string;
  traceUrl?: string;
}

export interface QualityRun {
  id: string;
  timestamp: string;
  passRate: number;
  passedTests: number;
  totalTests: number;
  bugs: number;
  coverage: number;
  apiHealth: "Healthy" | "Degraded";
  /** Sum of every test's durationMs in this run. Absent on runs reported before this field existed. */
  totalDurationMs?: number;
  tests: TestResult[];
}

/** Lightweight projection of a run for list/trend views that don't need every test. */
export type QualityRunSummary = Omit<QualityRun, "tests">;

const REDIS_KEY = "quality-metrics";
const REDIS_RUNS_KEY = "quality-metrics:runs";
// Tags the two read paths the homepage widget polls every 60s (see
// Dashboard.tsx) so a fresh automation report can invalidate them
// immediately via revalidateTag instead of waiting out the cache window.
const METRICS_CACHE_TAG = "quality-metrics";
const METRICS_CACHE_SECONDS = 30;
const DATA_FILE = path.join(process.cwd(), "data", "quality-metrics.json");
const RUNS_FILE = path.join(process.cwd(), "data", "quality-metrics-runs.json");

// How many past runs to keep. At one run/day (see qasolucity-automation's
// scheduled-run.yml) this is a bit over a year of history - plenty for the
// dashboard's trend charts without the list growing without bound. Each
// run is small (a few hundred tests' worth of JSON), so keeping full
// payloads in one capped list is simpler than a separate per-run key
// scheme and is nowhere close to a real storage concern at this scale.
const MAX_RUNS = 200;

// Vercel's Upstash Redis integration has used both naming conventions
// over time depending on how the store was provisioned (via the
// Marketplace "Upstash" integration, or the older "Vercel KV" product it
// replaced) - checking both means this works regardless of which one is
// connected to the project, with no extra configuration needed beyond
// connecting the integration itself.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const redis =
  redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

/**
 * Redis when it's configured (any real deployment should have it -
 * that's the whole point, a serverless host's local filesystem doesn't
 * survive between requests), a local JSON file otherwise. The file
 * fallback exists purely so `npm run dev` works out of the box without
 * anyone having to provision a Redis instance just to see the dashboard
 * locally - it is not a production persistence strategy.
 */
async function readMetrics(): Promise<QualityMetrics | null> {
  if (redis) {
    return (await redis.get<QualityMetrics>(REDIS_KEY)) ?? null;
  }
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as QualityMetrics;
  } catch {
    return null;
  }
}

// Cached for METRICS_CACHE_SECONDS - the homepage's Quality Command Center
// widget polls this every 60s from every open tab (see Dashboard.tsx), and
// automation only reports in about once a day (see MAX_RUNS's comment), so
// most of those polls were re-hitting Redis for data that hadn't changed.
// A short cache window turns repeat polls into edge cache hits instead of
// fresh function invocations; setMetrics below invalidates it immediately
// on a real write so a new report still shows up without waiting it out.
export const getMetrics = unstable_cache(
  readMetrics,
  ["quality-metrics:get-metrics"],
  { tags: [METRICS_CACHE_TAG], revalidate: METRICS_CACHE_SECONDS }
);

export async function setMetrics(metrics: QualityMetrics): Promise<void> {
  if (redis) {
    await redis.set(REDIS_KEY, metrics);
  } else {
    await fs.writeFile(DATA_FILE, JSON.stringify(metrics, null, 2));
  }
  // A real automation report should be visible right away, not held back
  // by getMetrics' cache window above.
  revalidateTag(METRICS_CACHE_TAG, { expire: 0 });
}

async function readLocalRuns(): Promise<QualityRun[]> {
  try {
    const raw = await fs.readFile(RUNS_FILE, "utf-8");
    return JSON.parse(raw) as QualityRun[];
  } catch {
    return [];
  }
}

async function writeLocalRuns(runs: QualityRun[]): Promise<void> {
  await fs.writeFile(RUNS_FILE, JSON.stringify(runs, null, 2));
}

/** Appends one run to history, newest first, trimmed to MAX_RUNS. */
export async function appendRun(run: QualityRun): Promise<void> {
  if (redis) {
    // Pass the object directly (not a pre-stringified string) - the SDK
    // JSON-serializes/deserializes automatically, same as getMetrics/
    // setMetrics above. Stringifying it ourselves first would double-encode.
    await redis.lpush(REDIS_RUNS_KEY, run);
    await redis.ltrim(REDIS_RUNS_KEY, 0, MAX_RUNS - 1);
  } else {
    const runs = await readLocalRuns();
    runs.unshift(run);
    await writeLocalRuns(runs.slice(0, MAX_RUNS));
  }
  // Same reasoning as setMetrics: this run should show up in the trend
  // chart on the next poll, not after the cache window expires.
  revalidateTag(METRICS_CACHE_TAG, { expire: 0 });
}

/**
 * Every read that returns per-test detail goes through this, so stored
 * history is public-safe regardless of when it was reported: runs from
 * before the automation repo started summarizing errors still hold raw
 * Playwright output (code frames, runner paths, selectors). A no-op on
 * already-summarized messages.
 */
function withReadableErrors(run: QualityRun): QualityRun {
  return {
    ...run,
    tests: run.tests.map((test) => (test.error ? { ...test, error: summarizeError(test.error) } : test)),
  };
}

function toSummary(run: QualityRun): QualityRunSummary {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructured only to exclude it from `summary`
  const { tests: _tests, ...summary } = run;
  return summary;
}

/** Newest-first page of run summaries (no per-test detail - see getRunById for that). */
export async function getRuns(limit = 20, offset = 0): Promise<QualityRunSummary[]> {
  if (redis) {
    const runs = await redis.lrange<QualityRun>(REDIS_RUNS_KEY, offset, offset + limit - 1);
    return runs.map(toSummary);
  }
  const runs = await readLocalRuns();
  return runs.slice(offset, offset + limit).map(toSummary);
}

/**
 * One run's full detail including every test. Runs newest-first out of a
 * capped list rather than a dedicated per-run key - fine at this scale
 * (MAX_RUNS is small), see the comment on MAX_RUNS above.
 */
export async function getRunById(id: string): Promise<QualityRun | null> {
  if (redis) {
    const runs = await redis.lrange<QualityRun>(REDIS_RUNS_KEY, 0, MAX_RUNS - 1);
    const run = runs.find((r) => r.id === id);
    return run ? withReadableErrors(run) : null;
  }
  const runs = await readLocalRuns();
  const run = runs.find((r) => r.id === id);
  return run ? withReadableErrors(run) : null;
}

/**
 * Newest-first, full QualityRun objects (tests included) for the last
 * `limit` runs - the raw material Failures/Analytics/Test Explorer build
 * their cross-run views from (see lib/quality-metrics-analysis.ts).
 */
export async function getRunsFull(limit = 20): Promise<QualityRun[]> {
  if (redis) {
    const runs = await redis.lrange<QualityRun>(REDIS_RUNS_KEY, 0, limit - 1);
    return runs.map(withReadableErrors);
  }
  const runs = await readLocalRuns();
  return runs.slice(0, limit).map(withReadableErrors);
}

async function readTrend(limit: number): Promise<Array<{ timestamp: string; passRate: number }>> {
  const summaries = await getRuns(limit, 0);
  return summaries.map(({ timestamp, passRate }) => ({ timestamp, passRate })).reverse();
}

/**
 * Just timestamp + passRate for each of the last `limit` runs, oldest first
 * (chart-ready). Cached the same way and for the same reason as getMetrics
 * above - this is the other half of what the homepage widget polls every
 * 60s.
 */
export const getTrend = unstable_cache(
  readTrend,
  ["quality-metrics:get-trend"],
  { tags: [METRICS_CACHE_TAG], revalidate: METRICS_CACHE_SECONDS }
);
