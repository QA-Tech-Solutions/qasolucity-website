import { NextResponse } from "next/server";
import { getCertificationPricing } from "@/lib/certification-pricing";
import { allCertifications } from "@/features/certification/data/certification-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requested = searchParams.get("certification");
  const certificationCode =
    requested && allCertifications.some((item) => item.code === requested) ? requested : undefined;

  const pricing = await getCertificationPricing(certificationCode);

  return NextResponse.json(pricing, {
    headers: {
      // Fine for a short public cache - the underlying rate itself is
      // already cached upstream (see lib/certification-pricing.ts).
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
