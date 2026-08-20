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
        Quality for businesses.{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          Opportunity for people.
        </span>
      </h2>

      <div className="mt-10 space-y-6 text-lg leading-8 text-slate-600">
        <p>
          QA Solucity was founded in 2023 with a simple idea: better
          software and better QA talent should be easier to access.
        </p>

        <p>
          We started by helping businesses test their websites and
          digital products, giving teams the support they need to
          identify issues, improve user experience and release with
          greater confidence.
        </p>

        <p>
          But we also saw another side of the industry. There were
          talented people who wanted to build careers in Quality
          Assurance but didn't always know where to start, how to gain
          practical experience or how to access professional
          certifications recognised by the industry.
        </p>

        <p className="font-semibold text-slate-900">
          So we built QA Solucity to serve both sides.
        </p>

        <p>
          Today, we help businesses build more reliable digital
          products while helping aspiring and growing QA professionals
          develop the skills, credentials and experience they need to
          move forward.
        </p>
      </div>
    </motion.div>
  );
}