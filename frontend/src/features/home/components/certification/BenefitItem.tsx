"use client";

import { Award, Lightbulb, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  icon: string;
}

const icons = {
  star: Star,
  award: Award,
  sparkles: Lightbulb,
};

export default function BenefitItem({ title, icon }: Props) {
  const Icon = icons[icon as keyof typeof icons];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="group flex cursor-default items-center gap-4 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 dark:from-indigo-950/60 via-white dark:via-slate-900 to-violet-100 dark:to-violet-950/60 shadow-md ring-1 ring-slate-200/50 dark:ring-slate-700/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-200/50 dark:group-hover:shadow-indigo-950/50">
        <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
        
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-indigo-400/0 to-violet-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <span className="max-w-[140px] text-[15px] font-medium leading-6 text-slate-700 dark:text-slate-300 transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-slate-100">
        {title}
      </span>
    </motion.div>
  );
}