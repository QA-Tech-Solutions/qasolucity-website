"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock3 } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BlogCard from "@/components/blog/BlogCard";
import ZoomableImage from "@/components/blog/ZoomableImage";
import ShareButtons from "@/components/blog/ShareButtons";
import Footer from "@/features/home/components/footer";
import type { BlogPost } from "@/lib/blog";

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
  children: ReactNode;
}

export default function BlogPostContent({ post, relatedPosts, children }: Props) {
  return (
    <>
      <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#fdf2f8_100%)] pt-36 pb-16">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute left-[-6%] top-[-8%] h-72 w-72 rounded-full bg-indigo-200/50 blur-[140px]" />
          <div className="absolute right-[-4%] top-[12%] h-80 w-80 rounded-full bg-violet-200/50 blur-[140px]" />
        </div>

        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-8 max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700">
              {post.category}
            </span>

            <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-slate-900 md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readTime}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{post.author}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[32px] border border-slate-200/80 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.28)]"
          >
            <div className="relative h-[280px] w-full md:h-[420px]">
              <ZoomableImage src={post.image} alt={post.title} variant="fill" priority />
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="bg-white py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <article>{children}</article>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 flex flex-col gap-6 rounded-[28px] border border-slate-200/80 bg-slate-50/70 p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
                  {post.author
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{post.author}</p>
                  <p className="text-sm text-slate-500">{post.authorRole}</p>
                </div>
              </div>

              <ShareButtons title={post.title} path={`/blogs/${post.slug}`} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
              >
                Talk to Our Team
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/resources"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50"
              >
                Browse More Resources
              </Link>
            </motion.div>
          </div>
        </Container>
      </Section>

      {relatedPosts.length > 0 && (
        <Section className="bg-slate-50 py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                Keep reading
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                More from the blog
              </h3>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map((related, index) => (
                <BlogCard key={related.slug} post={related} index={index} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Footer />
    </>
  );
}
