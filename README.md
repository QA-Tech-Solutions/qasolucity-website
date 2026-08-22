# QA Solucity

**Where Quality Meets Innovation.**

The marketing website and content platform for [QA Solucity](https://qasolucity.com) — a quality engineering company that helps businesses build reliable digital products, and helps aspiring and growing QA professionals build real careers in software testing.

[![CI](https://github.com/QA-Tech-Solutions/qasolucity-website/actions/workflows/ci.yml/badge.svg)](https://github.com/QA-Tech-Solutions/qasolucity-website/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4)

---

## About QA Solucity

QA Solucity isn't just a QA outsourcing company. It's built around two audiences at once:

- **For businesses** — software testing, test automation, API and performance testing, QA consulting, and process/strategy work that helps product teams ship with confidence.
- **For QA professionals** — training, certification pathways (including ISTQB prep), and hands-on experience for people building a career in quality assurance, from complete beginners to engineers formalizing existing skills.

That two-sided positioning shows up throughout the site: the About page tells the founding story of both sides, the Services and Solutions sections cover the business offering in depth, and the homepage's certification section and the Blog support the career side.

## About this repository

This repo contains the full production site: marketing pages, a mega-menu navigation system, a contact form wired to real email notifications, and a file-based blog platform with dozens of published articles on software testing practices and tooling.

It is **not** a generic template. Content, copy, and structure are specific to QA Solucity and are actively maintained as the business and its offering evolve.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript |
| UI | React 19, [Base UI](https://base-ui.com), [Tailwind CSS v4](https://tailwindcss.com) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Forms | React Hook Form + Zod |
| Email | [Resend](https://resend.com) |
| Content | Markdown/MDX (`gray-matter`, `next-mdx-remote`) for the blog |
| Icons | `lucide-react`, `react-icons` |

> **Heads up for contributors:** this project runs a customized build of Next.js with real breaking changes from the version most people know — `middleware.ts` is `proxy.ts` here, for example. Read [`frontend/AGENTS.md`](frontend/AGENTS.md) and check `node_modules/next/dist/docs/` before assuming an API works the way you remember.

## Project structure

```
.
├── frontend/                    # The Next.js application (this is the whole app)
│   ├── content/blog/            # Blog posts — one Markdown file per post
│   ├── public/                  # Static assets (images, fonts, icons)
│   ├── src/
│   │   ├── app/                 # Routes (App Router) — pages, layouts, API routes
│   │   ├── features/            # Page-level feature folders (home, about, services,
│   │   │                        #   solutions, resources, blog, contact, navigation…)
│   │   ├── components/          # Shared, cross-feature UI (ui/, blog/, mdx/, layout/)
│   │   ├── lib/                 # Content loaders, utilities (blog.ts, slugify.ts…)
│   │   └── proxy.ts             # Edge/Node request handling (maintenance mode, etc.)
│   └── AGENTS.md                # Notes on this project's non-standard Next.js setup
└── README.md                    # You are here
```

Each major section of the site (Services, Solutions, Resources, Blog, About) follows the same pattern: a `data/` or `content/` source, a set of presentational components, and a route in `app/` that wires them together.

## Getting started

**Prerequisites:** Node.js 20+ (CI runs on Node 22), npm.

```bash
cd frontend
npm install
```

Create `frontend/.env.local` with at least:

```bash
RESEND_API_KEY=your_resend_api_key

# Optional — maintenance mode (see below)
MAINTENANCE_MODE=false
MAINTENANCE_BYPASS_SECRET=

# Optional — only needed if you're running qasolucity-automation
# against your local dev server (see "Quality Command Center" below)
AUTOMATION_API_TOKEN=
```

Then run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

Run from `frontend/`:

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run type-check` | `tsc --noEmit` |

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Sends contact form notification emails via Resend |
| `MAINTENANCE_MODE` | No | Set `true` to show a 503 maintenance page site-wide |
| `MAINTENANCE_BYPASS_SECRET` | No | Visit `/?bypass=<secret>` during maintenance to get a cookie that lets you preview the live site |
| `AUTOMATION_API_TOKEN` | No | Bearer token [qasolucity-automation](https://github.com/QA-Tech-Solutions/qasolucity-automation) authenticates with to POST live test results to `/api/quality-metrics`. Generate one with `node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"` |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | No | Where `/api/quality-metrics` persists in production. Set automatically when you connect the Upstash Redis integration from Vercel's Marketplace tab — no need to fill these in by hand. Without them, falls back to a local file (dev only). |

## Writing a blog post

Blog posts live in `frontend/content/blog/` as plain Markdown files with frontmatter — no CMS, no database. Add a new post by creating a file there:

```markdown
---
title: "Your Post Title"
excerpt: "One or two sentences shown on the blog list and card previews."
category: "QA Testing"
date: "2026-08-21"
image: "/images/blog/your-post-slug.png"
author: "Your Name"
authorRole: "Your Role"
---

Your post content, in standard Markdown — headings, lists, **bold**,
`code`, code blocks, tables, blockquotes, and images all work and are
styled to match the site automatically. Images are click-to-zoom by
default.

![An example image](/images/blog/your-post-slug-figure-1.png)
```

The filename (minus `.md`) becomes the post's slug and URL: `content/blog/your-post-slug.md` → `/blogs/your-post-slug`. Read time is calculated automatically. Drop the matching cover image into `frontend/public/images/blog/`.

The homepage's scrolling tech/testing-type marquee automatically links a pill to its matching blog post the moment a post with that slug exists — no extra wiring needed.

## Key features

- **Mega-menu navigation** across Services, Solutions, and Resources, each backed by structured data with FAQ accordions and cross-links between related content.
- **Contact form** with server-side validation and branded email notifications via Resend.
- **File-based blog** with MDX rendering, category filtering, related-post suggestions, social sharing, and copy-link functionality.
- **A bundled FAQ page** (`/faq`) — pulls every question already defined on the Services, Solutions, Resources, and Contact pages into one searchable, filterable hub, rather than duplicating content. See `src/features/faq/data/faq-data.ts`.
- **Maintenance mode** — a real `HTTP 503` (not just a themed 200 page) triggered by an environment variable, with a bypass mechanism for the team.
- **Custom error states** — a branded 404 page and 500 error boundaries (route-level and global), not the framework defaults.

## Quality Command Center

The homepage hero includes a live-looking dashboard card ("Quality Command Center") showing test pass rate, coverage, open bugs, and API health. That data is real, not decorative — it comes from a companion repo, [qasolucity-automation](https://github.com/QA-Tech-Solutions/qasolucity-automation), a Playwright test suite that runs against this site on a schedule and reports its results back here.

How the two repos connect:

1. **qasolucity-automation** runs its full test suite against the deployed site (on a GitHub Actions cron schedule) and POSTs a metrics summary to this repo's `POST /api/quality-metrics`, authenticated with a shared bearer token (`AUTOMATION_API_TOKEN`, set on both sides).
2. **This repo**'s `/api/quality-metrics` route stores the latest result and serves it back via `GET`. The `Dashboard` component (`src/features/home/components/hero/dashboard/Dashboard.tsx`) fetches it on load and polls every 60 seconds.
3. Until a real automation run has reported in, the dashboard shows seed/placeholder numbers and a **"Baseline"** badge instead of **"Live"** — it never claims real-time data it doesn't actually have.

**Storage:** `/api/quality-metrics` persists through `src/lib/quality-metrics-store.ts`, which uses Upstash Redis (connected via Vercel's Marketplace integration — set `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`, or the older `KV_REST_API_URL`/`KV_REST_API_TOKEN` naming, either works) when configured. Locally, with neither set, it falls back to a JSON file (`frontend/data/quality-metrics.json`) automatically — no Redis needed just to run `npm run dev`. A production deploy without the integration connected will get an explicit 500 on POST rather than silently losing every reported run.

## Deployment

The `build` job in [`.github/workflows/ci.yml`](frontend/.github/workflows/ci.yml) lints, type-checks, and builds on every push and pull request to `main`. Deployment itself is handled outside this repo — check with the team for the current hosting setup before assuming a platform.

## Maintainer

**John Adeniyi**

## Contact

- **Website:** [qasolucity.com](https://qasolucity.com)
- **Email:** [hello@qasolucity.com](mailto:hello@qasolucity.com)
- **LinkedIn:** [linkedin.com/company/qasolucity](https://www.linkedin.com/company/qasolucity/)

---

© QA Solucity. All rights reserved. This repository and its contents are proprietary to QA Solucity.
