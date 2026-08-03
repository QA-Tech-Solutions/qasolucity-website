"use client";

import { motion } from "framer-motion";
import StoryTimeline from "./StoryTimeline";

export default function StoryVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30 lg:p-10"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
        Our Journey
      </span>

      <h3 className="mt-5 text-3xl font-bold text-slate-900">
        How we approach quality.
      </h3>

      <div className="mt-10">
        <StoryTimeline />
      </div>
    </motion.div>
  );
}