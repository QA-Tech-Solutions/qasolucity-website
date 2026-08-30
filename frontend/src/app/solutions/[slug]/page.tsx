import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionDetailPage from "@/features/solutions/components/SolutionDetailPage";
import { getSolutionBySlug, solutions } from "@/features/solutions/data/solutions";
import { SITE_URL } from "@/lib/site-config";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {};
  }

  return {
    title: solution.title,
    description: solution.summary,
    alternates: {
      canonical: `/solutions/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export default async function Page({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
    description: solution.summary,
    provider: {
      "@type": "ProfessionalService",
      name: "QA Solucity",
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    url: `${SITE_URL}/solutions/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SolutionDetailPage slug={slug} />
    </>
  );
}
