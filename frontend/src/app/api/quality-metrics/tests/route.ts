import { NextResponse } from "next/server";
import { getRunsFull } from "@/lib/quality-metrics-store";
import { computeTestAggregates, isAdminSuiteTest } from "@/lib/quality-metrics-analysis";

const DEFAULT_WINDOW = 20;
const MAX_WINDOW = 100;

/**
 * Public, shared by Failures, Analytics, and Test Explorer - one cross-run
 * walk (computeTestAggregates) serves all three pages' different views of
 * the same underlying per-test history. admin.spec.ts's own tests are
 * always excluded (see isAdminSuiteTest) - those live behind the gated
 * /api/quality-metrics/admin-tests instead.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requested = Number(searchParams.get("window"));
  const window = Number.isFinite(requested) && requested > 0
    ? Math.min(Math.trunc(requested), MAX_WINDOW)
    : DEFAULT_WINDOW;

  const runs = await getRunsFull(window);
  const tests = computeTestAggregates(runs).filter((t) => !isAdminSuiteTest(t));
  return NextResponse.json({ tests, runsInWindow: runs.length });
}
