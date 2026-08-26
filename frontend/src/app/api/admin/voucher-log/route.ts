import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { getVoucherLogCsv } from "@/lib/certification-voucher-log-store";

export async function GET() {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const csv = await getVoucherLogCsv();

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="voucher-assignment-log.csv"',
      "Cache-Control": "no-store",
    },
  });
}
