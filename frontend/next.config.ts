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
};

export default nextConfig;
