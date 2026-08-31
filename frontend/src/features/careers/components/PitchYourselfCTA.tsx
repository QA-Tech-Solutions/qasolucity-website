"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function PitchYourselfCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-4 rounded-[28px] border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/30 dark:via-slate-900 dark:to-violet-950/20 px-8 py-10 text-center shadow-[0_18px_60px_-30px_rgba(79,70,229,0.35)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-md ring-1 ring-indigo-100 dark:ring-indigo-900/50">
        <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
        Don&apos;t see your role?
      </h3>
      <p className="max-w-md text-[15px] leading-7 text-slate-600 dark:text-slate-400">
        We&apos;re a small team, so we don&apos;t always have a listing open for every kind of
        QA person we&apos;d want to work with. If you think you&apos;d be a strong fit anyway, or
        you just want to be on our radar for when something opens up, tell us why.
      </p>
      <a
        href="mailto:careers@qasolucity.com?subject=Speculative%20application"
        className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
      >
        <Mail className="h-4 w-4" />
        Pitch yourself
      </a>
    </motion.div>
  );
}
