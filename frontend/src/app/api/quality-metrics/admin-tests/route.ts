import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { getRunsFull } from "@/lib/quality-metrics-store";
import { computeTestAggregates, isAdminSuiteTest } from "@/lib/quality-metrics-analysis";

const DEFAULT_WINDOW = 20;
const MAX_WINDOW = 100;

/**
 * Gated counterpart to /api/quality-metrics/tests - same cross-run
 * aggregation, filtered to *only* admin.spec.ts's own tests (the suite
 * covering /admin/assign-voucher and /admin/voucher-log). See
 * isAdminSuiteTest's comment for why this one slice is held back while
 * everything else on the dashboard is public.
 */
export async function GET(request: Request) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const requested = Number(searchParams.get("window"));
  const window = Number.isFinite(requested) && requested > 0
    ? Math.min(Math.trunc(requested), MAX_WINDOW)
    : DEFAULT_WINDOW;

  const runs = await getRunsFull(window);
  const tests = computeTestAggregates(runs).filter(isAdminSuiteTest);
  return NextResponse.json({ tests, runsInWindow: runs.length });
}
