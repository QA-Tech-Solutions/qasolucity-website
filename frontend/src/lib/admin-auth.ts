import { cookies } from "next/headers";

/**
 * Shared-secret admin gate for /admin/* actions (currently just voucher
 * assignment). Mirrors the MAINTENANCE_BYPASS_SECRET pattern already used
 * in proxy.ts: one secret, compared directly, stored in an httpOnly
 * cookie on success — no user accounts or session store, which matches
 * the rest of this app's "small team, shared secret" security model.
 */

export const ADMIN_SESSION_COOKIE = "qas_admin_session";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

/** True if the access code matches ADMIN_ACCESS_CODE. Fails closed if that's unset. */
export function checkAdminAccessCode(code: string): boolean {
  const expected = process.env.ADMIN_ACCESS_CODE;
  return Boolean(expected) && code === expected;
}

/** Server Component / Route Handler helper: is the current request already authenticated? */
export async function isAdminSessionValid(): Promise<boolean> {
  const expected = process.env.ADMIN_ACCESS_CODE;
  if (!expected) return false;
  const store = await cookies();
  return store.get(ADMIN_SESSION_COOKIE)?.value === expected;
}
