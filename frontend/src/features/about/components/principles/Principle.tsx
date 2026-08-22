"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  index: number;
  title: string;
  description: string;
}

export default function Principle({ index, title, description }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group border-b border-slate-200 dark:border-slate-800 py-8 transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-700 lg:py-12"
    >
      <div className="grid gap-6 lg:grid-cols-[100px_1fr_1.2fr]">
        {/* Number */}
        <span className="text-5xl font-black text-slate-200 transition-colors duration-300 group-hover:text-indigo-200 lg:text-6xl">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold leading-tight text-slate-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 lg:text-3xl">
          {title}
        </h3>

        {/* Description + Arrow */}
        <div className="flex items-start gap-4">
          <p className="flex-1 text-base leading-7 text-slate-600 dark:text-slate-400 transition-colors duration-300 group-hover:text-slate-700 dark:group-hover:text-slate-300 dark:text-slate-400 lg:text-lg lg:leading-8">
            {description}
          </p>
          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 dark:text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
        </div>
      </div>
    </motion.div>
  );
}