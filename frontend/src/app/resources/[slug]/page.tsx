import { notFound } from "next/navigation";
import ResourceDetailPage from "@/features/resources/components/ResourceDetailPage";
import { getResourceBySlug, resourceCategories } from "@/features/resources/data/resources";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return resourceCategories.map((resource) => ({ slug: resource.slug }));
}

export default async function Page({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return <ResourceDetailPage slug={slug} />;
}
