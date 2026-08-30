import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";

/**
 * Bulk exam-voucher inventory for the All-Inclusive Certification Bundle.
 *
 * QA Solucity buys official exam vouchers from the registrar (AT*SQA/iSQI)
 * in batches and loads the unused codes here, keyed by certification. This
 * store is read-only from the enrollment flow (it may *suggest* a code so
 * the admin doesn't have to hunt for one) and is only ever mutated by an
 * explicit, authenticated admin action on /admin/assign-voucher - see
 * frontend/data/VOUCHER_INVENTORY_TEMPLATE.md for the full process and why
 * nothing here is ever consumed automatically (there's no payment gateway,
 * so nothing is confirmed paid at enrollment time).
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

/** Read-only: the oldest available code for a certification, without removing it. Used only as a convenience suggestion. */
export async function peekNextVoucherCode(certificationCode: string): Promise<string | null> {
  try {
    if (redis) {
      const code = (await redis.lindex(inventoryKey(certificationCode), 0)) as string | null;
      return code ?? null;
    }
    const inventory = await readLocalInventory();
    return inventory[certificationCode]?.[0] ?? null;
  } catch (error) {
    console.error("certification-voucher-store: failed to peek a voucher code", error);
    return null;
  }
}

/** Read-only: every currently available code for a certification, oldest first. */
export async function listAvailableVoucherCodes(certificationCode: string): Promise<string[]> {
  try {
    if (redis) {
      return await redis.lrange<string>(inventoryKey(certificationCode), 0, -1);
    }
    const inventory = await readLocalInventory();
    return inventory[certificationCode] ?? [];
  } catch (error) {
    console.error("certification-voucher-store: failed to list voucher codes", error);
    return [];
  }
}

/** Whether a specific code is still in the available pool for a certification. */
export async function isVoucherAvailable(certificationCode: string, code: string): Promise<boolean> {
  const codes = await listAvailableVoucherCodes(certificationCode);
  return codes.includes(code);
}

/**
 * Removes a specific code from the available pool - this IS the "used"
 * record. There's no separate used/unused flag: whatever remains in the
 * pool is available, and nothing else is. Returns false if the code
 * wasn't found (already used, typo'd, or never loaded).
 */
export async function markVoucherUsed(certificationCode: string, code: string): Promise<boolean> {
  try {
    if (redis) {
      const removed = await redis.lrem(inventoryKey(certificationCode), 1, code);
      return removed > 0;
    }
    const inventory = await readLocalInventory();
    const codes = inventory[certificationCode] ?? [];
    const index = codes.indexOf(code);
    if (index === -1) return false;

    codes.splice(index, 1);
    inventory[certificationCode] = codes;
    await writeLocalInventory(inventory);
    return true;
  } catch (error) {
    console.error("certification-voucher-store: failed to mark a voucher code used", error);
    return false;
  }
}
