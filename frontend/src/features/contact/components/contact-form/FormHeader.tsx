"use client";

import { motion } from "framer-motion";

export default function FormHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-800/40 bg-indigo-50/50 dark:bg-indigo-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
        </span>
        Project Discovery
      </div>

      <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
        Tell us about your{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          project.
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
        Share a few details about your project and our QA specialists
        will recommend the best approach for your team.
      </p>
    </motion.div>
  );
}