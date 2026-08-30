import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getMaintenanceHtml } from "@/lib/maintenance-html";

const BYPASS_COOKIE = "qas_maintenance_bypass";

// The site's original home before the qasolucity.com domain existed.
// Once that domain is live, flip ENABLE_DOMAIN_REDIRECT to "true" (see
// .env.example) so anyone still landing here (old links, bookmarks,
// whatever's already indexed) gets a real 301 to the canonical domain
// instead of two copies of the site competing for the same search
// queries. Matches metadataBase/sitemap.ts/robots.ts, which already
// treat qasolucity.com as canonical.
const LEGACY_HOST = "qasolucity.vercel.app";
const CANONICAL_HOST = "qasolucity.com";

export function proxy(request: NextRequest) {
  // request.nextUrl.hostname isn't reliable for this: it can reflect the
  // internal request URL rather than what the client actually sent, so
  // this reads the real incoming Host header directly instead.
  const incomingHost = request.headers.get("host");
  if (process.env.ENABLE_DOMAIN_REDIRECT === "true" && incomingHost === LEGACY_HOST) {
    const canonicalUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(canonicalUrl, 301);
  }

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
