"use client";

import { motion } from "framer-motion";

export default function FAQHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-5xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-800/40 bg-indigo-50/50 dark:bg-indigo-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
        </span>
        FAQ
      </div>

      <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl lg:text-[60px]">
        Everything you need to know{" "}
        <br className="hidden sm:block" />
        before working with us.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
        Answers to the questions we receive most often from startups,
        growing businesses and enterprise teams.
      </p>
    </motion.div>
  );
}