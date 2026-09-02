"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export interface ComparisonRow {
  label: string;
  without: string;
  with: string;
}

interface Props {
  eyebrow: string;
  heading: string;
  intro?: string;
  withoutLabel?: string;
  withLabel?: string;
  rows: ComparisonRow[];
}

export default function ComparisonTable({
  eyebrow,
  heading,
  intro,
  withoutLabel = "Without us",
  withLabel = "With QA Solucity",
  rows,
}: Props) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
          {heading}
        </h3>
        {intro && (
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            {intro}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 overflow-hidden rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm"
      >
        {/* Header row */}
        <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1.2fr_1fr_1fr] border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-950/40">
          <div className="hidden px-6 py-4 sm:block" />
          <div className="px-4 py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 sm:px-6">
            {withoutLabel}
          </div>
          <div className="px-4 py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400 sm:px-6">
            {withLabel}
          </div>
        </div>

        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`grid grid-cols-[1fr_1fr] sm:grid-cols-[1.2fr_1fr_1fr] ${
              index !== rows.length - 1
                ? "border-b border-slate-100 dark:border-slate-800/60"
                : ""
            }`}
          >
            <div className="col-span-2 px-4 pt-4 text-sm font-semibold text-slate-900 dark:text-slate-100 sm:col-span-1 sm:px-6 sm:py-4">
              {row.label}
            </div>
            <div className="flex items-start gap-2 px-4 pb-4 pt-2 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:items-center sm:px-6 sm:py-4">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600 sm:mt-0" />
              <span>{row.without}</span>
            </div>
            <div className="flex items-start gap-2 border-l border-slate-100 dark:border-slate-800/60 bg-indigo-50/30 dark:bg-indigo-950/10 px-4 pb-4 pt-2 text-sm leading-6 text-slate-700 dark:text-slate-300 sm:items-center sm:px-6 sm:py-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 sm:mt-0" />
              <span>{row.with}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
