"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Video,
  BookOpenCheck,
  Sparkles,
  FileCheck2,
  Timer,
  Ticket,
  Handshake,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import type { Pathway, PathwayFeatureIcon } from "../data/certification-data";

const FEATURE_ICONS: Record<PathwayFeatureIcon, LucideIcon> = {
  video: Video,
  bookOpenCheck: BookOpenCheck,
  sparkles: Sparkles,
  fileCheck2: FileCheck2,
  timer: Timer,
  ticket: Ticket,
  handshake: Handshake,
  messagesSquare: MessagesSquare,
};

export default function PathwayCard({ pathway }: { pathway: Pathway }) {
  const { track, eyebrow, title, tagline, description, priceLabel, originalPriceLabel, priceNote, durationLabel, features, ctaLabel, highlight, badge } = pathway;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative flex h-full flex-col rounded-[32px] border p-8 sm:p-10 ${
        highlight
          ? "border-indigo-300 dark:border-indigo-700 bg-gradient-to-b from-indigo-50/80 dark:from-indigo-950/30 to-white dark:to-slate-900 shadow-2xl shadow-indigo-200/40 dark:shadow-black/40 lg:scale-[1.03]"
          : "border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/40 dark:shadow-black/30"
      }`}
    >
      {badge && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-indigo-500/30 dark:shadow-indigo-950/50">
          {badge}
        </span>
      )}

      <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-500 dark:text-indigo-400">
        {eyebrow}
      </span>
      <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-[28px]">
        {title}
      </h3>
      <p className="mt-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">{tagline}</p>
      <p className="mt-4 text-[15px] leading-7 text-slate-600 dark:text-slate-400">{description}</p>

      <div className="mt-8 flex items-baseline gap-3">
        <span className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {priceLabel}
        </span>
        {originalPriceLabel && (
          <span className="text-lg font-medium text-slate-400 dark:text-slate-600 line-through">
            {originalPriceLabel}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
        {priceNote}
        {track === "prep" && " · excludes payment processing fee"}
      </p>

      <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
        <Timer className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
        {durationLabel} to certification-ready, varies by certification
      </p>

      <ul className="mt-8 flex-1 space-y-4">
        {features.map(({ label, icon }) => {
          const Icon = FEATURE_ICONS[icon];
          return (
            <li key={label} className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  highlight
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                }`}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="flex items-center gap-2 text-[15px] leading-6 text-slate-700 dark:text-slate-300">
                <Icon className="hidden h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500 sm:inline" />
                {label}
              </span>
            </li>
          );
        })}
      </ul>

      <Link
        href={`/certification/enroll?track=${track}`}
        className={`group mt-10 flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-[15px] font-semibold transition-all duration-300 ${
          highlight
            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40 hover:shadow-indigo-500/30 dark:hover:shadow-indigo-950/50 hover:scale-[1.02]"
            : "border border-indigo-200 dark:border-indigo-800/60 bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:scale-[1.02]"
        }`}
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </motion.article>
  );
}
