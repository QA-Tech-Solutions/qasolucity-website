import { notFound } from "next/navigation";
import SolutionDetailPage from "@/features/solutions/components/SolutionDetailPage";
import { getSolutionBySlug, solutions } from "@/features/solutions/data/solutions";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
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

  return <SolutionDetailPage solution={solution} />;
}
