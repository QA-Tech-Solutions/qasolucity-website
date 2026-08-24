import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicesDetailPage from "@/features/services/components/ServiceDetailPage";
import { getServiceBySlug } from "@/features/services/data/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "manual-testing" },
    { slug: "automation-testing" },
    { slug: "api-testing" },
    { slug: "performance-testing" },
    { slug: "qa-strategy" },
    { slug: "qa-process-setup" },
    { slug: "release-readiness" },
    { slug: "test-management" },
    { slug: "corporate-training" },
    { slug: "tools-training" },
    { slug: "workshops" },
  ];
}

export default async function Page({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "ProfessionalService",
      name: "QA Solucity",
      url: "https://qasolucity.com",
    },
    areaServed: "Worldwide",
    url: `https://qasolucity.com/services/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesDetailPage slug={slug} />
    </>
  );
}
