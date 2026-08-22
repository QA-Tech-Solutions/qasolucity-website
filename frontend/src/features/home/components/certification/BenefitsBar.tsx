"use client";

import { benefits } from "./certification-data";
import BenefitItem from "./BenefitItem";
import { motion } from "framer-motion";

export default function BenefitsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-[34px] border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-white dark:from-slate-900 via-white dark:via-slate-900 to-indigo-50/30 dark:to-indigo-950/30 px-12 py-10 shadow-xl shadow-slate-200/40"
    >
      {/* Decorative Glows */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-100/20 dark:bg-indigo-900/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-100/20 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-12">
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-[260px] text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100"
        >
          Two Paths. <br />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            One Career.
          </span>
        </motion.h3>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-14"
        >
          {benefits.map((item) => (
            <BenefitItem
              key={item.title}
              {...item}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}