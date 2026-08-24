import type { Metadata } from "next";
import BlogPage from "@/features/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical guides, QA best practices, automation tips and industry trends from the QA Solucity team.",
  alternates: {
    canonical: "/blogs",
  },
};

export default function Page() {
  return <BlogPage />;
}
