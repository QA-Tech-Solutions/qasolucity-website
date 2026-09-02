"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional - when set, the card links out (e.g. to that capability's
   * own dedicated service page) instead of being purely descriptive. */
  href?: string;
}

interface Props {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: Capability[];
  columns?: 2 | 3;
}

export default function CapabilityGrid({
  eyebrow,
  heading,
  intro,
  items,
  columns = 3,
}: Props) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
          {heading}
        </h3>
        {intro && (
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            {intro}
          </p>
        )}
      </motion.div>

      <div
        className={`mt-10 grid gap-5 sm:grid-cols-2 ${
          columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const cardClassName =
            "group rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg";

          const content = (
            <>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 transition-colors duration-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50">
                  <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                {item.href && (
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                )}
              </div>
              <h4 className="mt-5 font-bold text-slate-900 dark:text-slate-100 transition-colors duration-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </>
          );

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.06 }}
            >
              {item.href ? (
                <Link href={item.href} className={cardClassName + " block h-full"}>
                  {content}
                </Link>
              ) : (
                <div className={cardClassName}>{content}</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
