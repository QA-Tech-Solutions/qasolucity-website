import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Same Redis instance and the same env-var fallback as
// quality-metrics-store.ts, so this works unmodified against either the
// "Upstash" Marketplace integration or the older "Vercel KV" naming.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

const limiters = new Map<string, Ratelimit>();

/**
 * A sliding-window limiter per (name, identifier) pair, backed by the
 * same Redis every other persisted part of this app uses - correct
 * across serverless instances, unlike an in-memory counter. Without
 * Redis configured (local dev with blank credentials - see .env.local),
 * this fails open rather than throwing, the same tradeoff
 * quality-metrics-store.ts makes for its own local fallback: a login
 * form that 500s because a dev hasn't provisioned Redis is worse than
 * one with no local rate limit.
 *
 * `name` scopes the limit to one endpoint (its own Redis key prefix) so
 * separate call sites can't share or clobber each other's budget.
 */
export async function rateLimit(
  name: string,
  identifier: string,
  { limit, windowSeconds }: { limit: number; windowSeconds: number }
): Promise<{ success: boolean; remaining: number }> {
  if (!redis) return { success: true, remaining: limit };

  let limiter = limiters.get(name);
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      prefix: `ratelimit:${name}`,
    });
    limiters.set(name, limiter);
  }

  const { success, remaining } = await limiter.limit(identifier);
  return { success, remaining };
}

/** Best-effort client identifier - Vercel sets x-forwarded-for; falls back to a
 * shared bucket (still better than no limit at all) if it's ever absent. */
export function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}
