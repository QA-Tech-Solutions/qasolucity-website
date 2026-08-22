"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function WhyContactCard({ icon: Icon, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-lg shadow-slate-200/40 transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-xl hover:shadow-indigo-100/30"
    >
      {/* Decorative glow on hover */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 shadow-inner transition-all duration-300 group-hover:shadow-md group-hover:shadow-indigo-200/50">
          <Icon className="h-7 w-7 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
            {title}
          </h3>
          <p className="mt-2 leading-8 text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}