# Voucher inventory — how it works, and the fill-in worksheet

## How this works, start to finish

This walks through the whole journey of one exam voucher — from QA Solucity
buying it, to a customer using it — and where each step happens today.
Two paths exist side by side: **pre-loaded** (mostly automatic) and
**on-demand** (fully manual). Which one a given customer gets just depends
on whether that certification's bucket already has a code sitting in it
when they enroll.

1. **QA Solucity buys a voucher from the registrar.** Someone on the team
   purchases an official exam voucher directly from AT*SQA or iSQI, for a
   specific certification (e.g. CTFL). This is always a manual, human step —
   nothing in the app buys vouchers.

2. **The code gets loaded into inventory (optional, but recommended).**
   That code is added to the bucket for its certification — either by
   editing the local JSON file or pushing it into Redis in production (see
   "Loading codes" below). This step is what makes step 5 automatic. If it's
   skipped, the voucher can still be emailed to a customer by hand later —
   it just won't be pre-stocked for instant handout.

3. **A customer enrolls in the All-Inclusive Bundle** (Route C) through
   `/certification/enroll`, choosing the certification they want. Enrolling
   does **not** collect payment — there's no card/payment gateway wired up
   yet. Payment currently happens offline (bank transfer or however QA
   Solucity arranges it), separately from this form.

4. **The system tries to auto-assign a code.** The moment the enrollment
   form is submitted, `/api/certification-enroll` calls
   `assignVoucherCode()` for that certification and checks its bucket:
   - **Bucket has a code (pre-loaded path):** it pops the oldest one out
     immediately and includes it in both the customer's confirmation email
     and the internal notification email to `hello@qasolucity.com`.
   - **Bucket is empty (on-demand path):** nothing is assigned. The
     customer's confirmation email instead says their voucher will follow
     within 24 hours, and the internal notification flags
     "None in stock — assign manually within 24h."

5. **Delivery to the customer:**
   - *Pre-loaded path:* already done — the code went out in the
     confirmation email in step 4, no further action needed.
   - *On-demand path:* a human now needs to buy a voucher for that
     certification (step 1, but reactively this time) and email the code to
     the customer directly — the confirmation email already told them to
     expect it within 24 hours.

⚠️ **Important gap to know about:** because there's no payment gateway,
step 4 (auto-assign) fires on *form submission*, not on *confirmed payment*.
If a certification's bucket is pre-loaded with real codes, a customer could
technically receive a voucher code before QA Solucity has actually received
their money. Until payment collection is automated too, either (a) only
pre-load a certification's bucket once you're comfortable relying on the
offline payment step happening reliably, or (b) leave buckets empty and
handle every voucher on-demand (step 5's manual path) so a human always
checks payment before sending a code by hand.

## Fill-in worksheet

Use this as a worksheet for whoever is loading real exam voucher codes —
it's not a file the app reads. Fill it in as codes get purchased from the
registrar (step 1 above), then transfer the filled-in codes into the real
store (step 2, "Loading codes" below). Never paste real codes into a shared
doc that isn't access-controlled — treat them like gift card numbers,
because that's effectively what they are.

Each certification is a separate bucket. `assignVoucherCode()` hands out
codes first-in-first-out per certification code (the short code in
parentheses below), so list codes in the order you bought them.

## Core Certifications

- **CTFL** — Certified Tester Foundation Level
  - code_1:
  - code_2:
  - code_3:
- **CT-TA** — Certified Tester Advanced Level — Test Analyst
  - code_1:
  - code_2:
- **CT-TTA** — Certified Tester Advanced Level — Technical Test Analyst
  - code_1:
  - code_2:
- **CT-TM** — Certified Tester Advanced Level — Test Manager
  - code_1:
  - code_2:

## Specialist Certifications

- **CT-TAE** — Certified Tester — Test Automation Engineer
  - code_1:
  - code_2:
- **CT-AI** — Certified Tester — AI Testing
  - code_1:
  - code_2:
- **CT-DEVOPS** — Certified Tester — DevOps Testing
  - code_1:
  - code_2:
- **CT-PT** — Certified Tester — Performance Testing
  - code_1:
  - code_2:
- **CT-MAT** — Certified Tester — Mobile Application Testing
  - code_1:
  - code_2:
- **CT-SEC** — Certified Tester — Security Tester
  - code_1:
  - code_2:

## Agile Certifications

- **CTFL-AT** — Certified Tester Foundation Level — Agile Tester
  - code_1:
  - code_2:
- **CTAL-ATT** — Certified Tester Advanced Level — Agile Technical Tester
  - code_1:
  - code_2:

---

## Loading codes into the real store (step 2, above)

The app never reads this file — it reads `certification-voucher-inventory.json`
(local dev, no Redis configured) or a Redis list per certification (production,
once the Upstash integration is connected). Both are keyed by the same short
codes used above.

**Local dev** — open `certification-voucher-inventory.json` and add your codes
to that certification's array, in purchase order (oldest first — that's the
one that gets handed out next):

```jsonc
{
  // Real, unused codes only. Anything sitting in a non-empty array here
  // WILL be popped and emailed to the next Bundle buyer for that
  // certification automatically — this is not a scratchpad or example
  // file, it's live inventory the app reads on every enrollment.
  "CTFL": ["CODE-ABC123", "CODE-DEF456"],

  // An empty array is the safe default and is exactly what "no stock yet"
  // looks like — leave it this way until you actually have a code to add.
  "CT-TA": [],
  "CT-TTA": [],
  "CT-TM": [],
  "CT-TAE": [],
  "CT-AI": [],
  "CT-DEVOPS": [],
  "CT-PT": [],
  "CT-MAT": [],
  "CT-SEC": [],
  "CTFL-AT": [],
  "CTAL-ATT": []
}
```

⚠️ **Caution:** the block above is `.jsonc` (JSON with comments) purely so the
notes are readable here. The real file, `certification-voucher-inventory.json`,
is **plain JSON** — `JSON.parse` does not accept `//` comments and will throw
if you paste them in. Strip every comment line before saving, keep only the
key/array pairs, and never add placeholder or fake-looking codes (e.g.
`"CODE-ABC123"` above is illustrative only) — anything in that file is treated
as real and gets emailed straight to a paying customer.

**Production (Redis)** — `assignVoucherCode()` pops from the *left* of the
list (`LPOP`), so push new codes onto the *right* with `RPUSH` to keep
first-bought-first-assigned order. Run this from the Upstash console's Data
Browser/CLI (or the REST API with the same `UPSTASH_REDIS_REST_URL` /
`UPSTASH_REDIS_REST_TOKEN` Vercel already has):

```
RPUSH certification:voucher-inventory:CTFL "CODE-ABC123" "CODE-DEF456"
```

If a certification's bucket is empty when someone buys the Bundle, enrollment
still succeeds — the confirmation email just tells them their voucher will
follow by email within 24 hours, which is the cue for an admin to buy one and
email it manually.
