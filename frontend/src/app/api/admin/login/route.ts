import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  checkAdminAccessCode,
} from "@/lib/admin-auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

// The single ADMIN_ACCESS_CODE is a shared secret, not a per-account
// password (see admin-auth.ts), which makes this endpoint a direct
// brute-force target without a limit - nothing else stood between a
// script and an unbounded number of guesses. 5 attempts per 5 minutes
// per IP is tight enough to make guessing impractical while still
// forgiving a real admin's own typos.
export async function POST(request: Request) {
  const { success } = await rateLimit("admin-login", getClientIp(request), {
    limit: 5,
    windowSeconds: 300,
  });
  if (!success) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a few minutes." },
      { status: 429 }
    );
  }

  const { accessCode } = (await request.json()) as { accessCode?: string };

  if (!checkAdminAccessCode(accessCode ?? "")) {
    return NextResponse.json({ error: "Incorrect access code" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, accessCode!, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
