"use client";

import { motion } from "framer-motion";
import { journey } from "./journey-data";

export default function JourneyTimeline() {
  return (
    <div className="mx-auto mt-16 max-w-3xl lg:mt-24">
      {journey.map((stage, index) => (
        <motion.div
          key={stage.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="flex gap-8"
        >
          {/* Node + connecting line */}
          <div className="flex flex-col items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-base font-bold text-white shadow-lg shadow-indigo-500/20">
              {index + 1}
            </div>
            {index !== journey.length - 1 && (
              <div className="mt-2 w-px flex-1 bg-slate-200 dark:bg-slate-700" />
            )}
          </div>

          {/* Content */}
          <div className="pb-16 pt-1 last:pb-0">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
              {stage.marker}
            </span>
            <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100 lg:text-3xl">
              {stage.title}
            </h3>
            <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-slate-400 lg:text-lg lg:leading-8">
              {stage.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
