import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

export interface QualityMetrics {
  passRate: number;
  passedTests: number;
  totalTests: number;
  bugs: number;
  coverage: number;
  apiHealth: "Healthy" | "Degraded";
  lastUpdated: string | null;
  source: "seed" | "automation";
}

const REDIS_KEY = "quality-metrics";
const DATA_FILE = path.join(process.cwd(), "data", "quality-metrics.json");

// Vercel's Upstash Redis integration has used both naming conventions
// over time depending on how the store was provisioned (via the
// Marketplace "Upstash" integration, or the older "Vercel KV" product it
// replaced) — checking both means this works regardless of which one is
// connected to the project, with no extra configuration needed beyond
// connecting the integration itself.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const redis =
  redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

/**
 * Redis when it's configured (any real deployment should have it —
 * that's the whole point, a serverless host's local filesystem doesn't
 * survive between requests), a local JSON file otherwise. The file
 * fallback exists purely so `npm run dev` works out of the box without
 * anyone having to provision a Redis instance just to see the dashboard
 * locally — it is not a production persistence strategy.
 */
export async function getMetrics(): Promise<QualityMetrics | null> {
  if (redis) {
    return (await redis.get<QualityMetrics>(REDIS_KEY)) ?? null;
  }
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as QualityMetrics;
  } catch {
    return null;
  }
}

export async function setMetrics(metrics: QualityMetrics): Promise<void> {
  if (redis) {
    await redis.set(REDIS_KEY, metrics);
    return;
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(metrics, null, 2));
}
