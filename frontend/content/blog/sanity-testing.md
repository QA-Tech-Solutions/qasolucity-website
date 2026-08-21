---
title: "Sanity Testing: Confirming a Fix Actually Fixed the Thing"
excerpt: "A developer says the bug is fixed. Sanity testing is the quick, focused check that confirms it, without re-running everything."
category: "QA Testing"
date: "2026-08-17"
image: "/images/blog/sanity-testing.png"
author: "John Adeniyi"
authorRole: "Quality Engineering"
---

Sanity testing gets confused with smoke testing constantly, and while they're related, they answer different questions. Smoke testing asks "is this build stable enough to test at all?" Sanity testing asks something narrower: "did this specific fix or change actually work, and does it look like it didn't break anything obviously adjacent?"

## When you reach for sanity testing

Sanity testing shows up after a targeted change, a bug fix, a small feature tweak, a minor patch, when you need a fast, focused confirmation before deciding whether deeper regression testing is warranted.

- A developer fixes a checkout bug. Sanity testing confirms checkout now works, and quickly checks the immediately related flows, not the entire application.
- A small config change goes out. Sanity testing verifies the specific area it touches behaves correctly.
- A hotfix ships to production. Sanity testing gives a fast "yes, this looks right" before wider verification happens.

## Sanity vs. smoke vs. regression

It's worth being precise about the difference, because teams often use these terms interchangeably and lose useful signal in the process:

| Test type | Scope | When |
| --- | --- | --- |
| Smoke testing | Broad but shallow, across the whole app | Right after a new build |
| Sanity testing | Narrow but slightly deeper, around a specific change | Right after a specific fix |
| Regression testing | Broad and deep, across affected areas | Before a release |

Sanity testing is the smallest, fastest of the three, unscripted, focused, and usually done without formal documentation.

> Sanity testing isn't about proving nothing else broke. It's about quickly confirming the thing that was supposed to be fixed, is fixed, before committing more time to verify further.

## Why skipping it costs more than it saves

It's tempting to skip sanity testing on "small" fixes, and that instinct is exactly how small fixes turn into re-opened tickets. A two-minute sanity check after a fix is dramatically cheaper than discovering three days later, during a full regression pass, that the "fixed" bug never actually got fixed.

Building this habit into a team's workflow, quick verification immediately after every fix, before it's marked resolved, closes a gap that causes a surprising share of "wait, didn't we fix this already?" moments.

If your defect resolution process needs tighter verification discipline, that's exactly the kind of process gap QA Solucity's [QA process setup](/services/qa-process-setup) service closes. [Reach out](/contact) to talk through your workflow.
