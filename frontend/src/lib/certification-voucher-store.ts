import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

/**
 * Bulk exam-voucher inventory for the All-Inclusive Certification Bundle.
 *
 * QA Solucity buys official exam vouchers from the registrar (AT*SQA/iSQI)
 * in batches and loads the unused codes here, keyed by certification. When
 * a Bundle enrollment comes in, `assignVoucherCode` pops one unused code
 * for that certification so it can be handed to the buyer immediately. If
 * the batch for that certification is empty — the default state until an
 * admin tool exists to load real codes — enrollment still succeeds; the
 * confirmation email tells the buyer their voucher will follow within 24
 * hours, which is our admin manually purchasing and assigning one.
 *
 * TODO: replace this Redis-list / local-JSON store with a real `vouchers`
 * DB table (columns: code, certification_code, status, assigned_to,
 * assigned_at) once an admin panel exists for loading and auditing stock.
 */

const inventoryKey = (certificationCode: string) =>
  `certification:voucher-inventory:${certificationCode}`;

const DATA_FILE = path.join(process.cwd(), "data", "certification-voucher-inventory.json");

const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

type LocalInventory = Record<string, string[]>;

async function readLocalInventory(): Promise<LocalInventory> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as LocalInventory;
  } catch {
    return {};
  }
}

async function writeLocalInventory(inventory: LocalInventory): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(inventory, null, 2));
}

/**
 * Pops one unused voucher code for the given certification, or `null` if
 * the batch is empty or the store is unreachable — either way, the caller
 * falls back to "an admin will email your voucher within 24 hours".
 */
export async function assignVoucherCode(certificationCode: string): Promise<string | null> {
  try {
    if (redis) {
      const code = await redis.lpop<string>(inventoryKey(certificationCode));
      return code ?? null;
    }

    const inventory = await readLocalInventory();
    const codes = inventory[certificationCode];
    if (!codes || codes.length === 0) return null;

    const [code, ...rest] = codes;
    inventory[certificationCode] = rest;
    await writeLocalInventory(inventory);
    return code;
  } catch (error) {
    console.error("certification-voucher-store: failed to assign a voucher code", error);
    return null;
  }
}
