"use client";

import { motion } from "framer-motion";

export default function TestimonialHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mb-20 max-w-3xl text-center"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
        </span>
        Testimonials
      </div>

      <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        What our{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          clients
        </span>{" "}
        are saying
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Trusted by startups, enterprises and growing product teams to
        deliver reliable software through world-class quality assurance.
      </p>
    </motion.div>
  );
}