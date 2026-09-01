import { NextResponse } from "next/server";
import { getRuns } from "@/lib/quality-metrics-store";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

/**
 * Public: run summaries never include per-test detail (see
 * QualityRunSummary), only the same kind of aggregate numbers the
 * homepage widget already shows. The one thing genuinely worth gating -
 * admin.spec.ts's own results - lives behind /api/quality-metrics/admin-tests
 * instead (see isAdminSuiteTest's comment for why that suite specifically).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedLimit = Number(searchParams.get("limit"));
  const limit = Number.isFinite(requestedLimit) && requestedLimit > 0
    ? Math.min(Math.trunc(requestedLimit), MAX_LIMIT)
    : DEFAULT_LIMIT;
  const requestedOffset = Number(searchParams.get("offset"));
  const offset = Number.isFinite(requestedOffset) && requestedOffset >= 0
    ? Math.trunc(requestedOffset)
    : 0;

  const runs = await getRuns(limit, offset);
  return NextResponse.json({ runs });
}
