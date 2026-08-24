"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function StoryVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative overflow-hidden rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30 transition-all duration-300 hover:shadow-indigo-100/30 dark:hover:shadow-black/40 lg:p-10"
    >
      {/* Decorative glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100/20 dark:bg-indigo-900/20 blur-3xl pointer-events-none" />

      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40">
        <Quote className="h-5 w-5 text-white" fill="currentColor" />
      </div>

      <p className="relative mt-8 text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100 lg:text-3xl">
        We believe quality should create{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          value on both sides of the screen.
        </span>
      </p>
    </motion.div>
  );
}