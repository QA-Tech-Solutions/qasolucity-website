import BlogPage from "@/features/blog";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical guides, QA best practices, automation tips and industry trends from the QA Solucity team.",
  path: "/blogs",
});

export default function Page() {
  return <BlogPage />;
}
