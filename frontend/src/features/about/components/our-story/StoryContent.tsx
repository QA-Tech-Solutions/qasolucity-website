"use client";

import { motion } from "framer-motion";

export default function StoryContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
        </span>
        Our Story
      </div>

      <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Quality isn't the final step.{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          It's the foundation.
        </span>
      </h2>

      <div className="mt-10 space-y-6 text-lg leading-8 text-slate-600">
        <p>
          QA Solucity was founded with a simple belief:
          software quality should never be an afterthought.
          It should be built into every stage of product
          development.
        </p>

        <p>
          We partner with startups, scale-ups and enterprise
          teams to improve software quality through manual
          testing, automation, API testing, performance
          engineering and modern QA practices.
        </p>

        <p>
          Our mission is to help ambitious teams release
          faster, reduce production issues and build products
          users genuinely trust.
        </p>
      </div>
    </motion.div>
  );
}