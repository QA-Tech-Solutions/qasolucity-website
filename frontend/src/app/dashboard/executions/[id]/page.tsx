import type { Metadata } from "next";
import RunDetail from "@/features/dashboard/components/RunDetail";

export const metadata: Metadata = {
  title: "Execution detail",
  // Individual run permalinks are numerous and ephemeral - not worth
  // indexing even though they're public, same reasoning as not indexing
  // every dynamic timestamped page on a status site.
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <RunDetail id={id} />;
}
