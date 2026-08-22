"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ServiceDetail } from "../data/services";

interface Props {
  service: ServiceDetail;
  delay?: number;
}

export default function ServiceCard({ service, delay = 0 }: Props) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-[0_24px_70px_-22px_rgba(79,70,229,0.28)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 via-white dark:via-slate-900 to-violet-100 shadow-md ring-1 ring-slate-200/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-200/50">
            <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
            {service.eyebrow}
          </span>
        </div>

        <div className="mt-6 flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
            {service.title}
          </h3>
          <p className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
            {service.summary}
          </p>
        </div>

        <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          Explore service
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
