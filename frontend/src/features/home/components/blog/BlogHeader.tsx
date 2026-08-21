"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end"
    >
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
          </span>
          Latest Insights
        </div>

        <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
          Expert insights on <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            software quality
          </span>{" "}
          and testing.
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          Stay informed with practical guides, QA best practices,
          automation tips and industry trends from our experts.
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <Link href="/blogs">
          <Button
            variant="outline"
            className="group h-14 rounded-2xl border-2 border-indigo-200 px-7 text-indigo-600 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700"
          >
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}