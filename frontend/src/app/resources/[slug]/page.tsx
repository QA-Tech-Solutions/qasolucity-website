import { notFound } from "next/navigation";

// The /resources hub is disabled for now - see src/app/resources/page.tsx
// for why. Restore this alongside that page once it's ready to ship.
export default function Page() {
  notFound();
}

// --- Original page, restore when /resources is ready to ship ---
//
// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import ResourceDetailPage from "@/features/resources/components/ResourceDetailPage";
// import { getResourceBySlug, resourceCategories } from "@/features/resources/data/resources";
//
// interface ResourcePageProps {
//   params: Promise<{ slug: string }>;
// }
//
// export async function generateMetadata({
//   params,
// }: ResourcePageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const resource = getResourceBySlug(slug);
//
//   if (!resource) {
//     return {};
//   }
//
//   return {
//     title: resource.title,
//     description: resource.summary,
//     alternates: {
//       canonical: `/resources/${slug}`,
//     },
//   };
// }
//
// export async function generateStaticParams() {
//   return resourceCategories.map((resource) => ({ slug: resource.slug }));
// }
//
// export default async function Page({ params }: ResourcePageProps) {
//   const { slug } = await params;
//   const resource = getResourceBySlug(slug);
//
//   if (!resource) {
//     notFound();
//   }
//
//   return <ResourceDetailPage slug={slug} />;
// }
