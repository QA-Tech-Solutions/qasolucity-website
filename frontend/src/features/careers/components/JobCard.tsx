"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, CalendarClock, Wallet, Lock } from "lucide-react";
import type { CareerPosting } from "@/lib/careers";
import { isJobOpen } from "@/lib/careers-status";
import { WORK_MODE_STYLE, formatDeadline, isDeadlineSoon } from "../lib/workMode";

export default function JobCard({ job, delay = 0 }: { job: CareerPosting; delay?: number }) {
  const modeStyle = WORK_MODE_STYLE[job.workMode];
  const ModeIcon = modeStyle.icon;
  const deadlineLabel = formatDeadline(job.deadline);
  const deadlineSoon = isDeadlineSoon(job.deadline);
  const open = isJobOpen(job);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <Link
        href={`/careers/${job.slug}`}
        className={`group flex h-full flex-col rounded-[28px] border p-7 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 ${
          open
            ? "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-[0_24px_70px_-22px_rgba(79,70,229,0.28)]"
            : "border-slate-200/60 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700"
        }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-xs font-semibold uppercase tracking-[0.2em] ${open ? "text-indigo-500 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"}`}
          >
            {job.department}
          </span>
          <span
            className={`ml-auto flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
              open
                ? "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                : "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
            }`}
          >
            {open ? "Open" : <Lock className="h-3 w-3" />}
            {!open && "Closed"}
          </span>
          <span
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${modeStyle.badgeClass} ${!open && "opacity-70"}`}
          >
            <ModeIcon className="h-3.5 w-3.5" />
            {job.workMode}
          </span>
        </div>

        <h3
          className={`mt-4 text-xl font-bold transition-colors duration-300 ${
            open
              ? "text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-300"
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          {job.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
          {job.summary}
        </p>

        <div className="mt-6 flex-1 space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
            {job.type}
          </div>
          {job.salaryLabel && (
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
              <span className="truncate">{job.salaryLabel}</span>
            </div>
          )}
          {deadlineLabel && (
            <div
              className={`flex items-center gap-2 ${open && deadlineSoon ? "font-semibold text-amber-600 dark:text-amber-400" : ""}`}
            >
              <CalendarClock className="h-4 w-4 shrink-0" />
              {open ? `Apply before ${deadlineLabel}` : `Closed ${deadlineLabel}`}
            </div>
          )}
        </div>

        <div
          className={`mt-6 flex items-center text-sm font-semibold ${open ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-500"}`}
        >
          {open ? "View role" : "View details"}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
