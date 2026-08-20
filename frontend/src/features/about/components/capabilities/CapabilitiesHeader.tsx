"use client";

import { motion } from "framer-motion";

export default function CapabilitiesHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
        </span>
        Our Capabilities
      </div>

      <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
        What we bring{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          to the table.
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
        A full range of capabilities for the businesses we test for and
        the QA professionals we train.
      </p>
    </motion.div>
  );
}
