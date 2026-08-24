"use client";

import { ArrowUpRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  featured = false,
}: Props) {
  return (
    // Entrance fade/slide lives on the wrapping motion.div in ServiceGrid
    // (which also drives the per-card stagger delay) — animating it again
    // here too used to nest two opacity transitions inside one another,
    // which compound multiplicatively and made the section visibly slower
    // to finish fading in than either animation alone.
    <motion.article
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white dark:from-slate-900 to-slate-50/60 dark:to-slate-900/60 p-8 transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      {/* Top Accent Gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Decorative Blur */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/5 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/15" />

      {/* Featured Badge */}
      {featured && (
        <div className="absolute right-4 top-4 z-20 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
          Popular
        </div>
      )}

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -3 }}
          transition={{ duration: 0.3 }}
          className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 transition-transform duration-300 group-hover:shadow-indigo-500/30"
        >
          <Icon className="h-8 w-8 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-[22px] font-semibold leading-snug tracking-tight text-slate-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
          {description}
        </p>

        {/* Arrow */}
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span>Learn More</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </motion.article>
  );
}