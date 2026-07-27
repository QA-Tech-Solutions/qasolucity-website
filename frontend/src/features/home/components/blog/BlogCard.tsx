"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Calendar } from "lucide-react";
import { Blog } from "./blogs-data";
import { motion } from "framer-motion";

interface Props {
  blog: Blog;
  index: number;
}

export default function BlogCard({ blog, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-500 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      {/* Image */}
      <Link href={blog.slug} className="relative block h-72 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Category Tag – Floating */}
        <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 backdrop-blur-sm shadow-sm">
          {blog.category}
        </span>

        {/* Read Time – Bottom Left */}
        <span className="absolute bottom-6 left-6 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
          <Clock3 className="h-3.5 w-3.5" />
          {blog.readTime}
        </span>
      </Link>

      {/* Content */}
      <div className="p-8">
        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {blog.date || "Jan 15, 2025"}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1.5">
            <Clock3 className="h-4 w-4" />
            {blog.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
          <Link href={blog.slug} className="hover:no-underline">
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mt-3 leading-7 text-slate-500 line-clamp-2">
          {blog.excerpt}
        </p>

        {/* Read More Link */}
        <Link
          href={blog.slug}
          className="mt-6 inline-flex items-center font-semibold text-indigo-600 transition-all duration-300 group-hover:translate-x-2"
        >
          Read Article
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}