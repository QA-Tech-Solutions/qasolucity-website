import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BlogHeader from "./BlogHeader";
import BlogCard from "@/components/blog/BlogCard";
import { getAllPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) {
    return null;
  }

  return (
    <Section className="relative overflow-hidden bg-[#FCFBF8] dark:bg-[#020617] py-32">
      {/* Background Design */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-100/25 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-100/25 blur-3xl" />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(252,251,248,0.8) 100%)",
          }}
        />
      </div>

      <Container>
        <BlogHeader />
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
