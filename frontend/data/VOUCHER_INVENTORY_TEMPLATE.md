# Voucher inventory: how assignment actually works

There's no payment gateway on this site, so nothing is confirmed paid at
the moment someone enrolls in the All-Inclusive Bundle. The app is built
around that fact: it never hands out or marks used a real voucher code on
its own. A human always makes that call, on a protected admin screen,
after confirming payment.

## How this works, start to finish

1. **QA Solucity buys a voucher from the registrar.** Someone on the team
   purchases an official exam voucher directly from AT*SQA or iSQI, for a
   specific certification (e.g. CTFL).

2. **The code gets loaded into inventory.** Add it to that certification's
   list, see "Loading codes" below. This is what lets the admin screen
   (step 5) suggest and validate codes instead of the admin having to
   remember them from scratch.

3. **A customer enrolls in the Bundle** through `/certification/enroll`.
   No payment is collected. The app *peeks* the oldest available code for
   that certification (read-only, this does not remove it or reserve it
   for anyone) purely so the admin screen has something to prefill.

4. **The internal notification email** (sent to `CONTACT_NOTIFICATION_EMAIL`)
   includes an "Assign & Send Voucher" button linking to
   `/admin/assign-voucher`, with the certification, the customer's name
   and email, and that suggested code already filled in via the URL.

5. **The admin opens that link and logs in** with `ADMIN_ACCESS_CODE`, a
   shared secret, checked against an httpOnly cookie (same pattern as this
   project's maintenance-mode bypass). Without a correct code, nothing
   past this point is reachable, regardless of what's in the URL.

6. **The admin confirms payment happened** (bank transfer or however it's
   arranged, entirely outside the app) and checks both boxes on the
   screen: "payment received" and "code verified unused." Both are
   required before the send button enables, and both are checked again on
   the server when the form submits. A request that skipped the UI
   couldn't send a voucher without them either.

7. **Submitting marks the code used and emails it.** "Used" just means:
   removed from that certification's available list. There's no separate
   used/unused flag anywhere; whatever's still in the list is available,
   and nothing else is, so there's nothing to get out of sync. The server
   also re-checks the code is still actually in the pool right before
   removing it, so two admins can't both send the same code.

8. **It's logged, and you're told.** The assignment is appended to a
   running audit trail (never overwritten); see
   `src/lib/certification-voucher-log-store.ts`. The admin who sent it
   gets a confirmation email with a link to `/admin/voucher-log`, which
   downloads the full history as a CSV (name, email, certification, code,
   and timestamp for every voucher ever sent).

This is deliberately manual at the payment-confirmation step (6), because
nothing in the app can see whether money actually arrived. If a real
payment gateway gets integrated and can reliably confirm a specific order
was paid, step 6's checklist could be replaced with that confirmation.
Until then, a human is the only thing standing between "enrolled" and
"paid," and the admin screen exists specifically to keep that human in
the loop rather than skip them.

## Loading codes into inventory

The admin screen reads `certification-voucher-inventory.json` (local dev,
no Redis configured) or a Redis list per certification (production, once
the Upstash integration is connected), the same store `getFromDatabase`
uses elsewhere in this codebase. Both are keyed by certification code.

**Local dev.** Open `certification-voucher-inventory.json` and add your
codes to that certification's array:

```jsonc
{
  // Real, unused codes only. This file backs the admin assign screen's
  // suggestions and validation directly.
  "CTFL": ["CODE-ABC123", "CODE-DEF456"],
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

⚠️ The block above is shown as `.jsonc` (JSON with comments) purely for
readability here. The real file is **plain JSON**, so strip the comment
lines before saving.

**Production (Redis).** Push new codes onto the *right* with `RPUSH` so
older codes get suggested first:

```
RPUSH certification:voucher-inventory:CTFL "CODE-ABC123" "CODE-DEF456"
```

Run this from the Upstash console's Data Browser/CLI, or the REST API
with `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.

## Worksheet: codes bought but not yet loaded

A place to jot codes down between buying them (step 1) and loading them
into inventory (step 2), if you're not doing that immediately. Treat
these like gift card numbers, and don't paste them into a shared doc that
isn't access-controlled.

## Core Certifications

- **CTFL**, Certified Tester Foundation Level
  - code_1:
  - code_2:
  - code_3:
- **CT-TA**, Certified Tester Advanced Level - Test Analyst
  - code_1:
  - code_2:
- **CT-TTA**, Certified Tester Advanced Level - Technical Test Analyst
  - code_1:
  - code_2:
- **CT-TM**, Certified Tester Advanced Level - Test Manager
  - code_1:
  - code_2:

## Specialist Certifications

- **CT-TAE**, Certified Tester - Test Automation Engineer
  - code_1:
  - code_2:
- **CT-AI**, Certified Tester - AI Testing
  - code_1:
  - code_2:
- **CT-DEVOPS**, Certified Tester - DevOps Testing
  - code_1:
  - code_2:
- **CT-PT**, Certified Tester - Performance Testing
  - code_1:
  - code_2:
- **CT-MAT**, Certified Tester - Mobile Application Testing
  - code_1:
  - code_2:
- **CT-SEC**, Certified Tester - Security Tester
  - code_1:
  - code_2:

## Agile Certifications

- **CTFL-AT**, Certified Tester Foundation Level - Agile Tester
  - code_1:
  - code_2:
- **CTAL-ATT**, Certified Tester Advanced Level - Agile Technical Tester
  - code_1:
  - code_2:
