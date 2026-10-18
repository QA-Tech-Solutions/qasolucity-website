import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // The standalone "Solutions" section (and a few now-merged /services
  // sub-pages) was retired in favor of one consolidated /services catalog.
  // These 308s preserve any external links/SEO equity instead of 404ing.
  async redirects() {
    return [
      { source: "/solutions", destination: "/services", permanent: true },
      {
        source: "/solutions/startup-qa-launch-readiness",
        destination: "/services/qa-consulting",
        permanent: true,
      },
      {
        source: "/solutions/release-readiness-regression-testing",
        destination: "/services/qa-consulting",
        permanent: true,
      },
      {
        source: "/solutions/test-automation-acceleration",
        destination: "/services/automation-testing",
        permanent: true,
      },
      {
        source: "/solutions/api-quality-integration-assurance",
        destination: "/services/api-testing",
        permanent: true,
      },
      {
        source: "/solutions/performance-load-testing",
        destination: "/services/performance-testing",
        permanent: true,
      },
      {
        source: "/solutions/mobile-app-quality-assurance",
        destination: "/services/qa-software-testing",
        permanent: true,
      },
      {
        source: "/solutions/qa-process-strategy-consulting",
        destination: "/services/qa-consulting",
        permanent: true,
      },
      {
        source: "/solutions/dedicated-qa-team-augmentation",
        destination: "/services/staff-augmentation",
        permanent: true,
      },
      {
        source: "/services/manual-testing",
        destination: "/services/qa-software-testing",
        permanent: true,
      },
      {
        source: "/services/qa-strategy",
        destination: "/services/qa-consulting",
        permanent: true,
      },
      {
        source: "/services/qa-process-setup",
        destination: "/services/qa-consulting",
        permanent: true,
      },
      {
        source: "/services/release-readiness",
        destination: "/services/qa-consulting",
        permanent: true,
      },
      {
        source: "/services/test-management",
        destination: "/services/qa-consulting",
        permanent: true,
      },
      {
        source: "/services/workshops",
        destination: "/services",
        permanent: true,
      },
    ];
  },

  // Deliberately the documented "without nonces" CSP approach (see
  // https://nextjs.org/docs/app/guides/content-security-policy), not a
  // nonce-based one - nonces require every page to render dynamically on
  // every request, which would undo this project's actual work this
  // quarter to keep pages statically generated and cacheable (the
  // Vercel-usage incident the Quality Command Center's own caching exists
  // to prevent a repeat of). 'unsafe-inline' is the real tradeoff that
  // buys back: this app has no user-generated HTML rendered anywhere
  // (MDX blog/job content comes from this repo, not visitors), so the
  // residual risk is low relative to the cost of forcing dynamic
  // rendering everywhere.
  //
  // Where each allowance comes from:
  // - script-src/style-src 'unsafe-inline': the ~7 per-page JSON-LD
  //   <script> tags (structured data) and framer-motion's inline style
  //   props throughout the UI.
  // - connect-src https://*.posthog.com: PostHog event tracking, only
  //   ever initialized after cookie consent (see lib/posthog.ts).
  // - img-src/media-src https://*.public.blob.vercel-storage.com: failed
  //   test screenshots/videos on the (admin-gated) Quality Dashboard,
  //   uploaded by qasolucity-automation when Vercel Blob is connected.
  // - frame-src https://trace.playwright.dev: the same dashboard's
  //   "open trace" viewer (RunDetail.tsx), Playwright's own hosted tool.
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    const csp = `
      default-src 'self';
      script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https://*.public.blob.vercel-storage.com;
      media-src 'self' https://*.public.blob.vercel-storage.com;
      font-src 'self' data:;
      connect-src 'self' https://*.posthog.com;
      frame-src https://trace.playwright.dev;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `
      .replace(/\s{2,}/g, " ")
      .trim();

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing here uses camera or location; microphone stays
          // allowed for the contact form's dictation feature (see
          // features/contact/hooks/useSpeechToText.ts).
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
          // Vercel already terminates TLS and redirects to HTTPS, so this
          // just tells browsers to skip the first plaintext round trip on
          // repeat visits. Not submitted to the HSTS preload list - that's
          // a manual, one-way step at hstspreload.org if ever wanted.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
