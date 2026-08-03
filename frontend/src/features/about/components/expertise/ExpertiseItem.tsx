"use client";

import { ArrowUpRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ExpertiseItem({ icon: Icon, title, description }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group border-b border-slate-200 py-8 transition-all duration-300 hover:border-indigo-200 lg:py-12"
    >
      <div className="grid gap-6 lg:grid-cols-[80px_280px_1fr_auto]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-300 group-hover:bg-indigo-50 lg:h-16 lg:w-16">
          <Icon className="h-6 w-6 text-indigo-600 transition-transform duration-300 group-hover:scale-110 lg:h-7 lg:w-7" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-700 lg:text-3xl">
          {title}
        </h3>

        <p className="text-base leading-7 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 lg:text-lg lg:leading-9">
          {description}
        </p>

        <ArrowUpRight className="mt-1 h-5 w-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-indigo-600 lg:h-6 lg:w-6" />
      </div>
    </motion.article>
  );
}