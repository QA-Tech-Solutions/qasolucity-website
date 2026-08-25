import { NextResponse } from "next/server";
import { getCertificationPricing } from "@/lib/certification-pricing";

export async function GET() {
  const pricing = await getCertificationPricing();

  return NextResponse.json(pricing, {
    headers: {
      // Fine for a short public cache — the underlying rate itself is
      // already cached upstream (see lib/certification-pricing.ts).
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
