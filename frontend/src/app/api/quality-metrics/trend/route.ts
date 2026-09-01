import { NextResponse } from "next/server";
import { getTrend } from "@/lib/quality-metrics-store";

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 200;

/**
 * Public and deliberately lightweight - just timestamp + passRate for the
 * dashboard Overview's trend chart. No test titles or errors here (those
 * are the same "gated detail" the Executions/Failures pages hold behind
 * the admin login), only the same kind of aggregate number the homepage
 * widget already shows publicly today, just historized.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requested = Number(searchParams.get("limit"));
  const limit = Number.isFinite(requested) && requested > 0
    ? Math.min(Math.trunc(requested), MAX_LIMIT)
    : DEFAULT_LIMIT;

  const trend = await getTrend(limit);
  return NextResponse.json({ trend });
}
