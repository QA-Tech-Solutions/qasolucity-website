import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getMaintenanceHtml } from "@/lib/maintenance-html";

const BYPASS_COOKIE = "qas_maintenance_bypass";

export function proxy(request: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
  if (!isMaintenanceMode) {
    return NextResponse.next();
  }

  const bypassSecret = process.env.MAINTENANCE_BYPASS_SECRET;
  const { searchParams } = request.nextUrl;

  // Let the team preview the live site during maintenance via a secret
  // query param, which sets a cookie for subsequent requests.
  if (bypassSecret && searchParams.get("bypass") === bypassSecret) {
    const response = NextResponse.next();
    response.cookies.set(BYPASS_COOKIE, bypassSecret, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 12,
    });
    return response;
  }

  if (bypassSecret && request.cookies.get(BYPASS_COOKIE)?.value === bypassSecret) {
    return NextResponse.next();
  }

  return new NextResponse(getMaintenanceHtml(), {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "3600",
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|fonts|illustrations|sitemap.xml|robots.txt).*)",
  ],
};
