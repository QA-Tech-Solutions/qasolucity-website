import Footer from "@/features/home/components/footer";
import BlogListHero from "./components/BlogListHero";
import BlogListGrid from "./components/BlogListGrid";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BlogListHero />
      <BlogListGrid posts={posts} />
      <Footer />
    </>
  );
}
