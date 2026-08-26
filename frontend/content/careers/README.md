# Adding a job posting

This folder is empty by default — the careers page shows its empty state
until a real posting is added here. Don't add a posting for a role that
isn't actually open; the page links straight to applying.

Add a new file named after the role, e.g. `qa-automation-engineer.md`.
The filename (minus `.md`) becomes the URL slug: `/careers/qa-automation-engineer`.

```markdown
---
title: "QA Automation Engineer"
department: "QA Testing"
type: "Full-time"
workMode: "Remote"
location: "Lagos, Nigeria (Remote)"
salaryLabel: "₦450,000 – ₦700,000 / month"
deadline: "2026-09-30"
postedDate: "2026-08-26"
status: "open"
summary: "One or two sentences shown on the job card and as the page's meta description."
responsibilities:
  - "Design, build, and maintain automated test suites for client products"
  - "Work with the QA team to define what should be automated vs. tested manually"
requirements:
  - "2+ years of hands-on QA automation experience"
  - "Comfortable with Playwright or Selenium"
  - "A reliable laptop and stable internet connection (this is a remote role)"
niceToHave:
  - "Experience with API testing tools like Postman"
hiringProcess:
  - "Application review"
  - "Initial screening call (30 minutes)"
  - "Technical assessment"
  - "Final interview with the team"
  - "Offer"
---

## About the role

Freeform Markdown goes here — headings, paragraphs, lists, bold, all work
and render the same as a blog post. This is the narrative "what you'd
actually be doing" section; the structured lists above (responsibilities,
requirements, etc.) get their own dedicated, consistently-styled sections
on the page automatically, so there's no need to repeat them here.
```

## Field notes

- **`type`**: `"Full-time"`, `"Part-time"`, `"Contract"`, or `"Internship"`.
- **`workMode`**: `"Remote"`, `"Hybrid"`, or `"Onsite"` — shown as a badge on
  every card and the detail page.
- **`salaryLabel`**: optional. Omit it entirely (delete the line) rather
  than leaving it blank if the role's pay isn't being disclosed publicly.
- **`deadline`**: optional. Omit it for a rolling/open-until-filled role;
  the page then just doesn't show a deadline instead of showing a blank one.
  Once this date passes (end of day, Lagos time), the posting **stops
  counting as open on its own** — you don't have to remember to come back
  and flip `status` by hand. This check re-runs on every page visit (see
  `export const dynamic = "force-dynamic"` in `app/careers/page.tsx` and
  `app/careers/[slug]/page.tsx`), not just at the next deploy.
- **`status`**: set to `"closed"` once a role is filled rather than
  deleting the file. Closed (or deadline-passed) postings still show on
  the public `/careers` listing — muted, badged "Closed", with no apply
  button — rather than disappearing, so people can see what's been hired
  for. Their page keeps working too, with a "no longer accepting
  applications" notice in place of the form, so a shared or bookmarked
  link doesn't just 404 once a role fills. Only genuinely open postings
  get a canonical URL, `JobPosting` schema, and a `sitemap.xml` entry —
  closed ones are `noindex` and left out of the sitemap (see
  `generateMetadata` in `app/careers/[slug]/page.tsx` and
  `app/sitemap.ts`).
- **`niceToHave`**: optional, omit entirely if there isn't a meaningful
  "bonus" list beyond the hard requirements.

To close a role, change `status` to `"closed"`. To pull it entirely,
delete the file.
