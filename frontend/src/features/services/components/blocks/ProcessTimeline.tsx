"use client";

import { motion } from "framer-motion";

export interface ProcessStep {
  title: string;
  description: string;
}

interface Props {
  eyebrow: string;
  heading: string;
  intro?: string;
  steps: ProcessStep[];
}

export default function ProcessTimeline({ eyebrow, heading, intro, steps }: Props) {
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

      <div className="relative mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Connector line - desktop only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent lg:block"
        />

        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h4 className="mt-4 font-bold text-slate-900 dark:text-slate-100">
              {step.title}
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
