"use client";

import { motion } from "framer-motion";

export interface ServiceStat {
  value: string;
  label: string;
}

interface Props {
  stats: ServiceStat[];
}

export default function StatsStrip({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          className="rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 px-5 py-6 text-center shadow-sm sm:px-6"
        >
          <p className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            {stat.value}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
