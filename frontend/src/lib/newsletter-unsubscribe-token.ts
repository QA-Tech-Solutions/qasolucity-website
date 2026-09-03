import { createHmac, timingSafeEqual } from "crypto";

/**
 * Signs an email address so the one-click unsubscribe link can't be used to
 * remove an arbitrary stranger's address just by guessing it. Proportionate
 * to what's actually at stake here (a newsletter opt-out, not an account or
 * payment action) - an HMAC over the email is enough, no need for anything
 * heavier like short-lived tokens or a database lookup.
 */
const secret = process.env.NEWSLETTER_UNSUB_SECRET || "dev-only-insecure-newsletter-unsub-secret";

function sign(email: string): string {
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

export function createUnsubscribeToken(email: string): string {
  return sign(email);
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = sign(email);
  const expectedBuf = Buffer.from(expected);
  const providedBuf = Buffer.from(token || "");
  if (expectedBuf.length !== providedBuf.length) return false;
  return timingSafeEqual(expectedBuf, providedBuf);
}
