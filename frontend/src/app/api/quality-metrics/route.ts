import { NextResponse } from "next/server";
import {
  getMetrics,
  setMetrics,
  appendRun,
  type QualityMetrics,
  type TestResult,
} from "@/lib/quality-metrics-store";

function isValidMetrics(payload: unknown): payload is QualityMetrics {
  if (typeof payload !== "object" || payload === null) return false;
  const p = payload as Record<string, unknown>;
  return (
    typeof p.passRate === "number" &&
    typeof p.passedTests === "number" &&
    typeof p.totalTests === "number" &&
    typeof p.bugs === "number" &&
    typeof p.coverage === "number" &&
    (p.apiHealth === "Healthy" || p.apiHealth === "Degraded")
  );
}

// `tests` is optional on the wire (older automation clients, or a manual
// POST while testing, won't send it) - when present, every entry needs
// the shape the dashboard's run-history views expect, or the whole
// payload is rejected rather than silently recording partial/malformed
// per-test data.
function isValidTestResult(value: unknown): value is TestResult {
  if (typeof value !== "object" || value === null) return false;
  const t = value as Record<string, unknown>;
  return (
    typeof t.title === "string" &&
    typeof t.file === "string" &&
    (t.project === "desktop" || t.project === "mobile") &&
    (t.status === "passed" || t.status === "failed" || t.status === "skipped") &&
    typeof t.durationMs === "number" &&
    (t.error === undefined || typeof t.error === "string") &&
    (t.screenshotUrl === undefined || typeof t.screenshotUrl === "string") &&
    (t.videoUrl === undefined || typeof t.videoUrl === "string") &&
    (t.traceUrl === undefined || typeof t.traceUrl === "string")
  );
}

export async function GET() {
  const metrics = await getMetrics();
  if (!metrics) {
    return NextResponse.json({ error: "No metrics available yet" }, { status: 503 });
  }
  return NextResponse.json(metrics);
}

export async function POST(request: Request) {
  const token = process.env.AUTOMATION_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Automation reporting is not configured" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization") ?? "";
  if (authHeader !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  if (!isValidMetrics(payload)) {
    return NextResponse.json({ error: "Invalid metrics payload" }, { status: 400 });
  }

  // Optional per-test detail for the dashboard's run-history views (see
  // isValidTestResult's comment) - kept separate from `metrics` itself,
  // since QualityMetrics (the "latest snapshot" the homepage widget
  // fetches) has never included it and shouldn't start now.
  const rawTests = (payload as { tests?: unknown }).tests;
  let tests: TestResult[] = [];
  if (rawTests !== undefined) {
    if (!Array.isArray(rawTests) || !rawTests.every(isValidTestResult)) {
      return NextResponse.json({ error: "Invalid tests payload" }, { status: 400 });
    }
    tests = rawTests;
  }

  const timestamp = new Date().toISOString();
  const metrics: QualityMetrics = {
    passRate: payload.passRate,
    passedTests: payload.passedTests,
    totalTests: payload.totalTests,
    bugs: payload.bugs,
    coverage: payload.coverage,
    apiHealth: payload.apiHealth,
    lastUpdated: timestamp,
    source: "automation",
  };

  try {
    await setMetrics(metrics);
    if (tests.length > 0) {
      // Derived server-side from the tests actually in this payload,
      // rather than trusting a client-computed total - can't drift out of
      // sync with the per-test durations the dashboard shows alongside it.
      const totalDurationMs = tests.reduce((sum, t) => sum + t.durationMs, 0);
      await appendRun({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp,
        passRate: metrics.passRate,
        passedTests: metrics.passedTests,
        totalTests: metrics.totalTests,
        bugs: metrics.bugs,
        coverage: metrics.coverage,
        apiHealth: metrics.apiHealth,
        totalDurationMs,
        tests,
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Metrics could not be persisted" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, metrics });
}
