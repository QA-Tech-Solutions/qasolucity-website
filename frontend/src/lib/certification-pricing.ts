import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

/**
 * Live Naira pricing for QA Solucity's ISTQB certification pathways.
 *
 * Both the Prep Track's training fee and the Bundle's exam voucher cost
 * vary by certification (Advanced Level and some Specialist certs cost
 * more to train for and to sit than Foundation Level), so pricing is
 * always resolved for a specific certification code, not one flat number
 * across the whole catalog.
 */

// ---------------------------------------------------------------------------
// Fixed platform constants
// ---------------------------------------------------------------------------

/**
 * Per-certification exam voucher cost, in USD - confirmed rates.
 */
export const EXAM_USD_COST_BY_CERTIFICATION: Record<string, number> = {
  CTFL: 230,
  "CT-TA": 250,
  "CT-TTA": 250,
  "CT-TM": 250,
  "CT-TAE": 250,
  "CT-AI": 200,
  "CT-DEVOPS": 200,
  "CT-PT": 200,
  "CT-MAT": 200,
  "CT-SEC": 250,
  "CTFL-AT": 200,
  "CTAL-ATT": 250,
};

/** Used only if a certification code isn't in the map above (shouldn't happen for known codes). */
export const DEFAULT_EXAM_USD_COST = 230;

/**
 * QA Solucity's local training fee per certification (Naira) - the Prep
 * Track's full price, and the base the Bundle price is built on top of.
 */
export const TRAINING_FEE_NGN_BY_CERTIFICATION: Record<string, number> = {
  CTFL: 180_000,
  "CT-TA": 220_000,
  "CT-TTA": 220_000,
  "CT-TM": 250_000,
  "CT-TAE": 200_000,
  "CT-AI": 200_000,
  "CT-DEVOPS": 200_000,
  "CT-PT": 200_000,
  "CT-MAT": 180_000,
  "CT-SEC": 250_000,
  "CTFL-AT": 180_000,
  "CTAL-ATT": 250_000,
};

/** Used only if a certification code isn't in the map above (shouldn't happen for known codes). */
export const DEFAULT_TRAINING_FEE_NGN = 180_000;

/** Absolute last-resort USD->NGN rate if every live source and the cache are unreachable. */
export const HARDCODED_EMERGENCY_RATE = 1550;

/** Parallel/black-market spread added on top of the official rate. */
const PARALLEL_MARKET_SPREAD_NGN = 100;

/** Safety margin covering currency swings, card fees, and platform costs. */
const SAFETY_MARGIN_MULTIPLIER = 1.07;

/** Final price is rounded up to the nearest ₦1,000 for a clean checkout number. */
const ROUND_TO_NEAREST_NGN = 1_000;

const FETCH_TIMEOUT_MS = 5_000;

// ---------------------------------------------------------------------------
// Tier 3 storage - same Redis-when-configured / local-file-fallback pattern
// used by the quality metrics dashboard (see lib/quality-metrics-store.ts).
// Swap getFromDatabase/saveToDatabase for real DB queries if this ever
// moves off Redis (e.g. a `fx_rate_cache` table with a single latest row).
// ---------------------------------------------------------------------------

interface CachedRate {
  rate: number;
  source: "exchangerate-api" | "currencyfreaks";
  fetchedAt: string;
}

const REDIS_KEY = "certification:usd-ngn-rate";
const DATA_FILE = path.join(process.cwd(), "data", "certification-rate-cache.json");

const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

/** Tier 3: last successfully saved rate. */
async function getFromDatabase(): Promise<CachedRate | null> {
  try {
    if (redis) {
      return (await redis.get<CachedRate>(REDIS_KEY)) ?? null;
    }
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as CachedRate;
  } catch {
    // File/key doesn't exist yet, or the store is unreachable - either way
    // the caller treats "no cached rate" the same as "cache unreachable".
    return null;
  }
}

/** Persists a freshly fetched Tier 1/2 rate so Tier 3 has something to fall back to next time. */
async function saveToDatabase(entry: CachedRate): Promise<void> {
  try {
    if (redis) {
      await redis.set(REDIS_KEY, entry);
      return;
    }
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(entry, null, 2));
  } catch (error) {
    // Caching is best-effort - a write failure here must never block checkout pricing.
    console.error("certification-pricing: failed to persist rate cache", error);
  }
}

// ---------------------------------------------------------------------------
// Tier 1 & 2 - live providers
// ---------------------------------------------------------------------------

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response;
  } finally {
    clearTimeout(timer);
  }
}

/** Tier 1 (primary): exchangerate-api.com's pair endpoint. */
async function fetchTier1Rate(): Promise<number> {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  if (!apiKey) throw new Error("EXCHANGERATE_API_KEY is not configured");

  const response = await fetchWithTimeout(
    `https://v6.exchangerate-api.com/v6/${apiKey}/pair/USD/NGN`
  );
  const data = (await response.json()) as { result?: string; conversion_rate?: number };
  if (data.result !== "success" || typeof data.conversion_rate !== "number") {
    throw new Error("exchangerate-api.com returned an unexpected payload");
  }
  return data.conversion_rate;
}

/** Tier 2 (secondary fallback): CurrencyFreaks. */
async function fetchTier2Rate(): Promise<number> {
  const apiKey = process.env.CURRENCYFREAKS_API_KEY;
  if (!apiKey) throw new Error("CURRENCYFREAKS_API_KEY is not configured");

  const response = await fetchWithTimeout(
    `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}&symbols=NGN`
  );
  const data = (await response.json()) as { rates?: Record<string, string> };
  const rate = data.rates?.NGN ? Number(data.rates.NGN) : NaN;
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("CurrencyFreaks returned an unexpected payload");
  }
  return rate;
}

export interface ResolvedRate {
  rate: number;
  source: "exchangerate-api" | "currencyfreaks" | "cache" | "hardcoded";
}

/**
 * The triple-fallback pipeline: two live providers, then the last cached
 * rate, then a hardcoded emergency baseline. Never throws - checkout
 * pricing must always resolve to *something*.
 */
async function resolveUsdToNgnRate(): Promise<ResolvedRate> {
  try {
    const rate = await fetchTier1Rate();
    await saveToDatabase({ rate, source: "exchangerate-api", fetchedAt: new Date().toISOString() });
    return { rate, source: "exchangerate-api" };
  } catch (tier1Error) {
    console.error("certification-pricing: Tier 1 (exchangerate-api) failed", tier1Error);
  }

  try {
    const rate = await fetchTier2Rate();
    await saveToDatabase({ rate, source: "currencyfreaks", fetchedAt: new Date().toISOString() });
    return { rate, source: "currencyfreaks" };
  } catch (tier2Error) {
    console.error("certification-pricing: Tier 2 (CurrencyFreaks) failed", tier2Error);
  }

  const cached = await getFromDatabase();
  if (cached) {
    return { rate: cached.rate, source: "cache" };
  }

  return { rate: HARDCODED_EMERGENCY_RATE, source: "hardcoded" };
}

// ---------------------------------------------------------------------------
// Financial engineering
// ---------------------------------------------------------------------------

function roundUpToNearest(value: number, step: number): number {
  return Math.ceil(value / step) * step;
}

function resolveExamUsdCost(certificationCode: string): number {
  return EXAM_USD_COST_BY_CERTIFICATION[certificationCode] ?? DEFAULT_EXAM_USD_COST;
}

function resolveTrainingFeeNgn(certificationCode: string): number {
  return TRAINING_FEE_NGN_BY_CERTIFICATION[certificationCode] ?? DEFAULT_TRAINING_FEE_NGN;
}

/**
 * Turns a raw USD->NGN rate into the final bundle checkout price for a
 * given certification: parallel-market spread -> safety margin -> exam
 * cost -> that certification's training fee -> round up.
 */
function computeBundlePriceNgn(
  baseRate: number,
  examUsdCost: number,
  trainingFeeNgn: number
): { bundlePriceNgn: number; effectiveRate: number } {
  const parallelRate = baseRate + PARALLEL_MARKET_SPREAD_NGN;
  const hedgedRate = parallelRate * SAFETY_MARGIN_MULTIPLIER;
  const voucherNgn = hedgedRate * examUsdCost;
  const rawTotal = voucherNgn + trainingFeeNgn;
  return {
    bundlePriceNgn: roundUpToNearest(rawTotal, ROUND_TO_NEAREST_NGN),
    effectiveRate: hedgedRate,
  };
}

export interface CertificationPricing {
  trainingFeeNgn: number;
  examUsdCost: number;
  bundlePriceNgn: number;
  rateUsed: number;
  rateSource: ResolvedRate["source"];
  updatedAt: string;
}

/**
 * Public entry point: resolves the live rate through the fallback pipeline
 * and returns fully-computed Naira pricing for both routes, for the given
 * certification. Defaults to CTFL (Foundation Level, the cheapest tier) so
 * a caller that hasn't asked the buyer which certification yet still gets
 * a sensible "starting from" price to display.
 */
export async function getCertificationPricing(
  certificationCode: string = "CTFL"
): Promise<CertificationPricing> {
  const examUsdCost = resolveExamUsdCost(certificationCode);
  const trainingFeeNgn = resolveTrainingFeeNgn(certificationCode);

  try {
    const { rate, source } = await resolveUsdToNgnRate();
    const { bundlePriceNgn, effectiveRate } = computeBundlePriceNgn(rate, examUsdCost, trainingFeeNgn);

    return {
      trainingFeeNgn,
      examUsdCost,
      bundlePriceNgn,
      rateUsed: Math.round(effectiveRate),
      rateSource: source,
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    // Belt-and-braces: resolveUsdToNgnRate() itself never throws, but if
    // something upstream of it ever does, checkout still needs a price.
    console.error(
      "certification-pricing: pricing pipeline failed unexpectedly, using hardcoded baseline",
      error
    );
    const { bundlePriceNgn, effectiveRate } = computeBundlePriceNgn(
      HARDCODED_EMERGENCY_RATE,
      examUsdCost,
      trainingFeeNgn
    );
    return {
      trainingFeeNgn,
      examUsdCost,
      bundlePriceNgn,
      rateUsed: Math.round(effectiveRate),
      rateSource: "hardcoded",
      updatedAt: new Date().toISOString(),
    };
  }
}
