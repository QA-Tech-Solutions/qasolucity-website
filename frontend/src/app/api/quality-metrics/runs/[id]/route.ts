import { NextResponse } from "next/server";
import { getRunById } from "@/lib/quality-metrics-store";
import { isAdminSuiteTest } from "@/lib/quality-metrics-analysis";

/**
 * Public, with admin.spec.ts's own tests always stripped out of the
 * response - see isAdminSuiteTest's comment. This keeps the endpoint's
 * behavior the same regardless of who's asking, rather than branching on
 * a session to decide what to include.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const run = await getRunById(id);
  if (!run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }

  const publicRun = { ...run, tests: run.tests.filter((t) => !isAdminSuiteTest(t)) };
  return NextResponse.json({ run: publicRun });
}
