"use client";

import { motion } from "framer-motion";

export default function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-16 max-w-3xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
        </span>
        Our Services
      </div>

      <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Elevate Your Business with{" "}
        <br className="hidden sm:block" />
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          QA Solucity
        </span>
        's Integrated Solutions
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-500">
        From QA Testing and Automation to DevOps, Training, and Security - 
        Your Success, Our Commitment.
      </p>
    </motion.div>
  );
}