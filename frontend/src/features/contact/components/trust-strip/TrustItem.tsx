"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function TrustItem({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group flex h-full items-start gap-4 rounded-xl p-4 transition-all duration-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30"
    >
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 via-white dark:via-slate-900 to-violet-100 shadow-md ring-1 ring-slate-200/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-200/50">
        <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
      </div>

      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
}