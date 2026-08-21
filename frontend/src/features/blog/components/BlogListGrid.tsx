"use client";

import { useMemo, useState } from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost } from "@/lib/blog";

interface Props {
  posts: BlogPost[];
}

export default function BlogListGrid({ posts }: Props) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts]
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <Section className="bg-white py-20">
      <Container>
        {categories.length > 2 && (
          <div className="mb-14 flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} animate={false} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">
            No articles in this category yet.
          </p>
        )}
      </Container>
    </Section>
  );
}
