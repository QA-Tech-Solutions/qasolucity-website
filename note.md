# Working Notes

A running changelog of what's changed in this repo, in plain language, kept
alongside the git history rather than instead of it. `README.md` covers the
stable architecture; this file tracks what moved and why, dated as it happens.

New entries go on top, as `## YYYY-MM-DD` headings with a bullet list of what
changed underneath. Nothing here is a substitute for reading the code.

---

## 2026-09-06 — Baseline

Snapshot of where things stand right now, including changes made this session
that are sitting uncommitted in the working tree.

**Nav / Services**
- "Solutions" is gone from the header nav entirely (page, sitemap, FAQ
  aggregator all removed in an earlier pass).
- Services mega menu is two columns: "Full-Cycle Testing Services" (10 items)
  and "Training" (4 items).
- "DevOps" renamed to "DevOps as a Service" everywhere it appears as a
  service name (nav, services data, homepage tiles).
- Homepage "Cyber Security" tile renamed to "Security & Vulnerability
  Testing" — the old name was broader than what QA Solucity actually offers.
- Homepage "AI-powered Automation Tools" tile renamed to "AI Testing".
- Top-level Careers and Contact links removed from the header nav (still
  live in the footer).
- Resources dropdown reordered: Blog and FAQs (both live) now come before
  the "coming soon" items (Templates, Guides, E-books, Events). Those
  "coming soon" items render disabled/greyed out, not blurred.

**Resources hub disabled**
- `/resources` and `/resources/[slug]` are commented out at the page level
  (`notFound()` is the only active code; the real implementation is
  preserved as a comment block directly below it in each file). Most of the
  hub's categories aren't ready yet, and Blog/FAQs already have their own
  real routes.
- The sitemap entries for `/resources` and its sub-routes are commented out
  to match (a disabled page shouldn't be submitted to search engines).
- To bring it back: delete the `notFound()` stub and uncomment the original
  code in both page files, then uncomment the sitemap entries.

**Theming**
- The theme toggle only cycles Light/Dark now — "System" is no longer a
  click-through state in the UI. First-time visitors still get their OS
  theme automatically on load; a manual choice persists after that.

**Homepage**
- FAQ "Still have questions?" card no longer shows a light-colored shadow
  in dark mode.
- Footer's "Made with love by John Adeniyi" credit line is commented out
  (not deleted) — this is company work, not a personal project.
- The "Quality Command Center" hero widget was redesigned around a
  proof-then-pitch structure: real KPIs first, then an explicit pitch band
  ("This is Test Automation, one of our core services...") linking to the
  Test Automation service page and the full dashboard. The "Coverage" KPI
  label now reads "Test Coverage" for less technical visitors.

**Dashboard**
- Same "Test Coverage" label change on the Overview page.
- Analytics page swapped its "slowest/flakiest test" widgets for a run
  trend chart and a pass-rate trend chart.
- Sidebar has a sales-oriented CTA ("Want a dashboard like this for your
  own product?") linking to Contact.

**Copy pass**
- Replaced em dashes (—) with hyphens in user-facing service page copy
  (the checklist labels in `services.ts`) — left them alone in code
  comments, where they're just prose punctuation, not visible copy.
- A separate pass for AI-sounding phrasing in user-facing copy is still
  owed as a report back, not yet delivered.

**Automation repo** (`qasolucity-automation`, sibling repo — fully committed
and pushed to `main` as of this entry)
- Retired the stale `/solutions` route inventory and fixed a coverage-math
  bug that had been under-reporting real coverage.
- Coverage formula now treats a sampled batch of blog posts as covering the
  full blog category, since the sample validates a shared template rather
  than needing every post individually tested.
- Scheduled CI run now covers both desktop and mobile projects (was
  desktop-only).
- Added test coverage for retired-route redirects, the Quality Dashboard,
  the offline fallback page, and maintenance mode (the last one runs
  against an isolated local build only, never real production).
