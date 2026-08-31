"use client";

import { motion } from "framer-motion";
import { Inbox, Mail } from "lucide-react";

export default function CareersEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-xl flex-col items-center rounded-[32px] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 px-8 py-16 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-md ring-1 ring-slate-200/60 dark:ring-slate-700/60">
        <Inbox className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-slate-100">
        No open roles right now.
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-7 text-slate-600 dark:text-slate-400">
        We&apos;re not actively hiring at the moment, but we&apos;re always glad to hear from good
        QA people. Send us your resume and a note on what you&apos;re looking for, and
        we&apos;ll keep it on file for when something opens up.
      </p>
      <a
        href="mailto:careers@qasolucity.com?subject=Speculative%20application"
        className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
      >
        <Mail className="h-4 w-4" />
        Send us your resume
      </a>
    </motion.div>
  );
}
