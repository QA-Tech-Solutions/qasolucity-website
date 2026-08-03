"use client";

import { ArrowUpRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function WhyUsFeature({
  number,
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group border-b border-slate-200 py-8 transition-all duration-300 hover:border-indigo-200 lg:py-12"
    >
      <div className="flex flex-col gap-6 lg:gap-8">
        {/* Top row: Number + Icon */}
        <div className="flex items-start justify-between">
          <span className="text-5xl font-black text-slate-100 transition-colors duration-300 group-hover:text-indigo-100 lg:text-6xl">
            {number}
          </span>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-300 group-hover:bg-indigo-50 lg:h-14 lg:w-14">
            <Icon className="h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:scale-110 lg:h-6 lg:w-6" />
          </div>
        </div>

        {/* Bottom row: Title + Description + Arrow */}
        <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <h3 className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-700 lg:text-3xl">
            {title}
          </h3>

          <div className="flex items-start justify-between gap-4">
            <p className="max-w-2xl text-base leading-7 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 lg:text-lg lg:leading-9">
              {description}
            </p>

            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-indigo-600 lg:h-6 lg:w-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}