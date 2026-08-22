"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  audience: string;
  items: readonly { icon: LucideIcon; label: string }[];
  delay?: number;
}

export default function CapabilityGroup({ audience, items, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 lg:p-10"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
        {audience}
      </span>

      <div className="mt-8 space-y-2">
        {items.map(({ icon: Icon, label }, index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + index * 0.08, duration: 0.4 }}
            className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 transition-colors duration-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50">
              <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="font-medium text-slate-800 dark:text-slate-200">{label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
