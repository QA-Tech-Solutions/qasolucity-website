import { NextResponse } from "next/server";
import { removeSubscriber } from "@/lib/newsletter-store";
import { verifyUnsubscribeToken } from "@/lib/newsletter-unsubscribe-token";

const CONFIRMATION_PAGE = (message: string) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>QA Solucity newsletter</title>
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center; background:#f8fafc; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#0f172a; padding:24px; }
  .card { max-width:420px; text-align:center; background:#fff; border:1px solid #e2e8f0; border-radius:24px; padding:40px 32px; box-shadow:0 20px 40px -24px rgba(15,23,42,0.15); }
  h1 { font-size:20px; margin:0 0 12px; }
  p { font-size:14px; line-height:1.6; color:#64748b; margin:0; }
  a { color:#4f46e5; }
</style>
</head>
<body>
  <div class="card">
    <h1>QA Solucity newsletter</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;

function htmlResponse(message: string, status = 200) {
  return new NextResponse(CONFIRMATION_PAGE(message), {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

async function handleUnsubscribe(email: string | null, token: string | null) {
  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    return { ok: false as const };
  }
  await removeSubscriber(email);
  return { ok: true as const };
}

// A human clicking the "Unsubscribe" link in the email body - lands on a
// small confirmation page.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await handleUnsubscribe(searchParams.get("email"), searchParams.get("token"));

  if (!result.ok) {
    return htmlResponse("This unsubscribe link is invalid or has expired.", 400);
  }
  return htmlResponse("You've been unsubscribed. You won't receive any more newsletter emails from us.");
}

// RFC 8058 one-click unsubscribe - mail clients (Gmail, Yahoo, etc.) that
// show an "Unsubscribe" button next to the sender POST here directly,
// with no page render involved, so this just needs a 200.
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await handleUnsubscribe(searchParams.get("email"), searchParams.get("token"));

  if (!result.ok) {
    return NextResponse.json({ error: "Invalid unsubscribe link" }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
