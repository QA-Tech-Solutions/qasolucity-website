import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesDetailPage from "@/features/services/components/ServiceDetailPage";
import { getServiceBySlug } from "@/features/services/data/services";
import { SITE_URL } from "@/lib/site-config";
import { buildMetadata } from "@/lib/page-metadata";
import { buildBreadcrumbJsonLd } from "@/components/seo/Breadcrumbs";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// "ISTQB Certification Prep" and "QA Career Launchpad" exist in the
// services catalog (so they show up in the /services grid alongside
// everything else), but each already has its own dedicated, more
// complete page. Without this, /services/[slug] would self-canonicalize
// and emit its own Service schema for both, competing with /certification
// and /qa-career-launchpad for the same query instead of deferring to
// them - not excluded from generateStaticParams below for no reason,
// that was already correct, this just closes the gap it left open in
// the canonical tag, structured data, and (see sitemap.ts) the sitemap.
const DEDICATED_PAGE_FOR_SLUG: Record<string, string> = {
  "istqb-certification": "/certification",
  "qa-career-launchpad": "/qa-career-launchpad",
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  const dedicatedPage = DEDICATED_PAGE_FOR_SLUG[slug];

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: dedicatedPage ?? `/services/${slug}`,
    noIndex: Boolean(dedicatedPage),
  });
}

export async function generateStaticParams() {
  return [
    { slug: "qa-software-testing" },
    { slug: "automation-testing" },
    { slug: "api-testing" },
    { slug: "performance-testing" },
    { slug: "ai-testing" },
    { slug: "security-testing" },
    { slug: "qa-consulting" },
    { slug: "testing-as-a-service" },
    { slug: "staff-augmentation" },
    { slug: "devops" },
    { slug: "corporate-training" },
    { slug: "tools-training" },
  ];
}

export default async function Page({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // No Service schema for the two slugs deferring to a dedicated page
  // (see DEDICATED_PAGE_FOR_SLUG above) - that page already emits its
  // own, richer structured data (Course schema); duplicating a second,
  // conflicting block here for the same topic helps nothing.
  const jsonLd = DEDICATED_PAGE_FOR_SLUG[slug]
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.summary,
        provider: {
          "@type": "ProfessionalService",
          name: "QA Solucity",
          url: SITE_URL,
        },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/${slug}`,
      };

  // Same reasoning as jsonLd above: the two dedicated-elsewhere slugs
  // defer their breadcrumb trail to /certification and
  // /qa-career-launchpad too, rather than this noindexed page emitting a
  // second, conflicting one for the same content.
  const breadcrumbJsonLd = DEDICATED_PAGE_FOR_SLUG[slug]
    ? null
    : buildBreadcrumbJsonLd([
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: service.title },
      ]);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <ServicesDetailPage slug={slug} />
    </>
  );
}
