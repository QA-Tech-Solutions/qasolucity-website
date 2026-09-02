---
title: "Unit Testing: Why QA Should Care About Tests QA Doesn't Write"
excerpt: "Unit tests are usually written by developers, not testers. Here's why they still matter enormously to how we approach quality."
category: "QA Testing"
date: "2026-08-20"
image: "/images/blog/unit-testing.png"
author: "John Adeniyi"
authorRole: "Quality Engineering"
---

Unit testing is unusual on this list, it's typically written and owned by developers, not QA. But understanding it, and advocating for it, is very much a QA concern, because the strength of a product's unit test coverage directly shapes how much weight every later testing phase has to carry.

## What a unit test actually verifies

A unit test checks the smallest testable piece of code, usually a single function or method, in complete isolation from the rest of the system. Dependencies are typically mocked or stubbed out, so the test verifies exactly one thing: given this input, does this specific piece of logic produce the expected output?

```javascript
function calculateDiscount(price, percentage) {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Invalid discount percentage');
  }
  return price - (price * percentage / 100);
}

test('applies a valid discount correctly', () => {
  expect(calculateDiscount(100, 20)).toBe(80);
});

test('rejects an invalid percentage', () => {
  expect(() => calculateDiscount(100, 150)).toThrow();
});
```

Fast, isolated, and precise, exactly what makes unit tests cheap to run constantly and valuable for catching logic errors the instant they're introduced.

## Why QA should care, even without writing them

Strong unit test coverage changes what QA needs to focus on. If core business logic is thoroughly unit tested, QA can spend less time re-verifying calculation edge cases and more time on the things unit tests structurally can't cover, integration behavior, real user workflows, usability, and the unexpected interactions that only show up in a fully assembled system.

> Weak unit test coverage doesn't just mean more bugs. It means QA ends up doing the job unit tests should have done, at a much higher cost per bug found.

## What good unit test coverage actually looks like

Coverage percentage alone is a weak signal, 100% coverage with shallow assertions catches far less than 70% coverage with genuinely meaningful tests. We look for:

1. **Edge cases and boundary conditions covered**, not just the happy path
2. **Error conditions tested explicitly**, not assumed to be handled
3. **Tests that actually assert meaningful behavior**, not just "it didn't throw"
4. **Fast execution**, unit tests that take minutes to run stop getting run as often as they should

## Where QA fits into this conversation

Part of QA Solucity's [QA strategy](/services/qa-consulting) and [QA consulting](/services/qa-consulting) work involves helping teams think about testing as a full pyramid, unit, integration, and system-level coverage working together, rather than QA compensating for gaps lower in the stack. [Get in touch](/contact) if your team's testing strategy could use that broader view.
