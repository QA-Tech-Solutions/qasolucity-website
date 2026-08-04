import { notFound } from "next/navigation";
import BlogDetailPage from "@/features/home/components/blog/BlogDetailPage";
import { blogs, getBlogBySlug } from "@/features/home/components/blog/blogs-data";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug.replace("/blog/", "") }));
}

export default async function Page({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailPage blog={blog} />;
}
