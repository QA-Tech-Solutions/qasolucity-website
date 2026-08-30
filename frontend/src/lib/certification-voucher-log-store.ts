import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

/**
 * Append-only audit trail of every voucher an admin has actually sent -
 * separate from certification-voucher-store.ts (which only tracks what's
 * still *available*, not history). This file exists purely so there's a
 * record to hand back, as a CSV, of who got what code and when.
 *
 * Contains real customer PII (names, emails) - the local JSON file this
 * falls back to in dev is gitignored, and production should always have
 * Upstash Redis configured rather than relying on a server's local disk,
 * which is not guaranteed to persist between requests on serverless hosts.
 */

export interface VoucherLogEntry {
  timestamp: string;
  certificationCode: string;
  certificationName: string;
  voucherCode: string;
  customerName: string;
  customerEmail: string;
}

const REDIS_KEY = "certification:voucher-log";
const DATA_FILE = path.join(process.cwd(), "data", "voucher-assignment-log.json");

const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

async function readLocalLog(): Promise<VoucherLogEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as VoucherLogEntry[];
  } catch {
    return [];
  }
}

async function writeLocalLog(entries: VoucherLogEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
}

/** Appends one record. Never removes or rewrites existing history. */
export async function appendVoucherLogEntry(entry: VoucherLogEntry): Promise<void> {
  try {
    if (redis) {
      await redis.rpush(REDIS_KEY, JSON.stringify(entry));
      return;
    }
    const entries = await readLocalLog();
    entries.push(entry);
    await writeLocalLog(entries);
  } catch (error) {
    // Best-effort - a logging failure must never block the actual voucher
    // email from going out. The assignment itself is the source of truth;
    // this is an audit trail on top of it, not a prerequisite for it.
    console.error("certification-voucher-log-store: failed to append log entry", error);
  }
}

function escapeCsvField(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// Entries store the precise ISO timestamp (unambiguous, sortable) - this
// only formats it for human eyes at export time, in QA Solucity's own
// timezone rather than raw UTC.
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

/** Every logged assignment, oldest first, rendered as a downloadable CSV string. */
export async function getVoucherLogCsv(): Promise<string> {
  let entries: VoucherLogEntry[] = [];
  try {
    if (redis) {
      const raw = await redis.lrange<string>(REDIS_KEY, 0, -1);
      entries = raw.map((item) => JSON.parse(item) as VoucherLogEntry);
    } else {
      entries = await readLocalLog();
    }
  } catch (error) {
    console.error("certification-voucher-log-store: failed to read log entries", error);
  }

  const header = [
    "Date/Time (Lagos)",
    "Certification Code",
    "Certification Name",
    "Voucher Code",
    "Customer Name",
    "Customer Email",
  ];
  const rows = entries.map((e) => [
    formatTimestampForCsv(e.timestamp),
    e.certificationCode,
    e.certificationName,
    e.voucherCode,
    e.customerName,
    e.customerEmail,
  ]);

  return [header, ...rows].map((row) => row.map(escapeCsvField).join(",")).join("\n");
}
