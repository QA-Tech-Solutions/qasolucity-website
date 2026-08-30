import type { MetadataRoute } from "next";
import { services } from "@/features/services/data/services";
import { solutions } from "@/features/solutions/data/solutions";
import { resourceCategories } from "@/features/resources/data/resources";
import { getAllPosts } from "@/lib/blog";
import { getOpenJobs } from "@/lib/careers";

const SITE_URL = "https://qasolucity.com";

// getOpenJobs() below is date-dependent (see isJobOpen in lib/careers-status.ts)
// the same way app/careers/page.tsx is - without this, a job's presence here
// would freeze at whatever was open/closed at build time instead of updating
// as deadlines pass.
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/solutions`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/resources`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/blogs`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/careers`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((solution) => ({
    url: `${SITE_URL}/solutions/${solution.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const resourceRoutes: MetadataRoute.Sitemap = resourceCategories.map((resource) => ({
    url: `${SITE_URL}/resources/${resource.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Only open postings - closed ones set `robots: noindex` on the page
  // itself (see app/careers/[slug]/page.tsx), and listing a noindex URL
  // in the sitemap is a known anti-pattern Search Console flags.
  const careerRoutes: MetadataRoute.Sitemap = getOpenJobs().map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified: new Date(job.postedDate),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...solutionRoutes,
    ...resourceRoutes,
    ...blogRoutes,
    ...careerRoutes,
  ];
}
