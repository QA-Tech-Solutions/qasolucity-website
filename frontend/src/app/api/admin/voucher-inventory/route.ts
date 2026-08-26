import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { listAvailableVoucherCodes } from "@/lib/certification-voucher-store";
import { allCertifications } from "@/features/certification/data/certification-data";

export async function GET(request: Request) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const certification = searchParams.get("certification");

  if (!certification || !allCertifications.some((item) => item.code === certification)) {
    return NextResponse.json({ error: "Unknown certification" }, { status: 400 });
  }

  const codes = await listAvailableVoucherCodes(certification);
  return NextResponse.json({ codes });
}
