import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

/**
 * Newsletter subscribers, keyed by lowercased email so resubscribing just
 * refreshes the existing record instead of creating a duplicate row.
 *
 * Contains real customer PII (names, emails) - the local JSON file this
 * falls back to in dev is gitignored, and production should always have
 * Upstash Redis configured rather than relying on a server's local disk,
 * which is not guaranteed to persist between requests on serverless hosts.
 * Same pattern as certification-voucher-log-store.ts.
 */

export interface NewsletterSubscriber {
  name: string;
  email: string;
  subscribedAt: string;
}

const REDIS_KEY = "newsletter:subscribers";
const DATA_FILE = path.join(process.cwd(), "data", "newsletter-subscribers.json");

const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// @upstash/redis has, in some versions, auto-deserialized JSON values on
// read - accept either a raw string or an already-parsed object so this
// keeps working regardless.
function parseEntry(value: unknown): NewsletterSubscriber {
  return typeof value === "string" ? (JSON.parse(value) as NewsletterSubscriber) : (value as NewsletterSubscriber);
}

async function readLocal(): Promise<Record<string, NewsletterSubscriber>> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Record<string, NewsletterSubscriber>;
  } catch {
    return {};
  }
}

async function writeLocal(entries: Record<string, NewsletterSubscriber>): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
}

/**
 * Adds a subscriber, or refreshes their name/timestamp if that email is
 * already on the list. Returns whether this email is new (false means they
 * were already subscribed) - callers use that to avoid re-notifying the
 * admin for a repeat signup.
 */
export async function upsertSubscriber(entry: { name: string; email: string }): Promise<boolean> {
  const key = normalizeEmail(entry.email);
  const record: NewsletterSubscriber = {
    name: entry.name.trim(),
    email: entry.email.trim(),
    subscribedAt: new Date().toISOString(),
  };

  if (redis) {
    const existing = await redis.hget(REDIS_KEY, key);
    await redis.hset(REDIS_KEY, { [key]: JSON.stringify(record) });
    return existing === null || existing === undefined;
  }

  const entries = await readLocal();
  const isNew = !(key in entries);
  entries[key] = record;
  await writeLocal(entries);
  return isNew;
}

function escapeCsvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// Subscribers store the precise ISO timestamp (unambiguous, sortable) -
// this only formats it for human eyes at export time, in QA Solucity's
// own timezone rather than raw UTC.
const csvTimestampFormatter = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

function formatTimestampForCsv(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);
  if (Number.isNaN(date.getTime())) return isoTimestamp;
  return csvTimestampFormatter.format(date);
}

/** Every subscriber, oldest first, rendered as a downloadable/attachable CSV string. */
export async function getSubscribersCsv(): Promise<string> {
  let subscribers: NewsletterSubscriber[] = [];

  if (redis) {
    const all = await redis.hgetall<Record<string, string>>(REDIS_KEY);
    subscribers = Object.values(all ?? {}).map(parseEntry);
  } else {
    subscribers = Object.values(await readLocal());
  }

  subscribers.sort((a, b) => (a.subscribedAt < b.subscribedAt ? -1 : 1));

  const header = ["Date Subscribed (Lagos)", "Name", "Email"];
  const rows = subscribers.map((s) => [formatTimestampForCsv(s.subscribedAt), s.name, s.email]);

  return [header, ...rows].map((row) => row.map(escapeCsvField).join(",")).join("\n");
}
