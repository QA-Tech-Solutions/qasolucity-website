import Image from "next/image";
import Link from "next/link";

import { ArrowRight, Clock3 } from "lucide-react";

import { Blog } from "./blogs";

interface Props {
  blog: Blog;
}

export default function BlogCard({
  blog,
}: Props) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[12px]
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-indigo-200
        hover:shadow-2xl
        hover:shadow-indigo-500/10
      "
    >
      {/* Image */}

      <Link
        href={blog.slug}
        className="relative block h-72 overflow-hidden"
      >
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

        {/* Category */}

        {/* <span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 backdrop-blur">
          {blog.category}
        </span> */}
      </Link>

      {/* Content */}

      <div className="p-8">

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock3 className="h-4 w-4" />

          {blog.readTime}
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
          {blog.title}
        </h3>

        <p className="mt-5 leading-8 text-slate-500">
          {blog.excerpt}
        </p>

        <Link
          href={blog.slug}
          className="
            mt-8
            inline-flex
            items-center
            font-semibold
            text-indigo-600
            transition-all
            duration-300
            group-hover:translate-x-1
          "
        >
          Read Article

          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>

      </div>
    </article>
  );
}