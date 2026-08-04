import { notFound } from "next/navigation";
import ServicesDetailPage from "@/features/services/components/ServiceDetailPage";
import { getServiceBySlug } from "@/features/services/data/services";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
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

  return <ServicesDetailPage service={service} />;
}
