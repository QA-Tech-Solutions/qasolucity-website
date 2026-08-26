import type { Metadata } from "next";
import SolutionsPageShell from "@/features/solutions/components/SolutionsPageShell";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "QA solutions shaped around how your team actually ships: launch readiness, release regression, automation acceleration, API quality, performance, and more.",
  alternates: {
    canonical: "/solutions",
  },
};

export default function Page() {
  return <SolutionsPageShell />;
}
