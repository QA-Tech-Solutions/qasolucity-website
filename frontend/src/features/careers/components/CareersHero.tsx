"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Globe2,
  TrendingUp,
  Users,
  CheckCircle2,
  ShieldCheck,
  Bug,
  Target,
} from "lucide-react";

const BADGES = [
  { icon: Globe2, label: "Remote-friendly" },
  { icon: TrendingUp, label: "Client work from day one" },
  { icon: Users, label: "Small team, full ownership" },
];

// Ambient decorative icon chips scattered around the headline - purely
// visual, so they're hidden below lg where there's no room for them
// without colliding with the text.
const FLOATING_ICONS = [
  { icon: CheckCircle2, className: "top-[16%] left-[8%]", color: "text-indigo-500 dark:text-indigo-400", delay: 0 },
  { icon: ShieldCheck, className: "top-[10%] right-[10%]", color: "text-violet-500 dark:text-violet-400", delay: 0.6 },
  { icon: Bug, className: "top-[58%] left-[4%]", color: "text-rose-500 dark:text-rose-400", delay: 1.2 },
  { icon: Target, className: "bottom-[12%] right-[6%]", color: "text-indigo-500 dark:text-indigo-400", delay: 1.8 },
];

export default function CareersHero() {
  return (
    <div className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8f7ff_0%,_#eef2ff_45%,_#fdf2f8_100%)] dark:bg-[linear-gradient(135deg,_#020617_0%,_#0b0f2e_50%,_#1a0e1f_100%)] pt-40 pb-20">
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-0 h-[500px] w-[500px] rounded-full bg-indigo-200/40 dark:bg-indigo-900/25 blur-[160px]"
        />
        <motion.div
          animate={{ x: [20, -20, 20], y: [10, -10, 10], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-24 top-20 h-[450px] w-[450px] rounded-full bg-violet-200/40 dark:bg-violet-900/25 blur-[160px]"
        />
        <div className="absolute bottom-[-10%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-200/30 dark:bg-fuchsia-900/20 blur-[140px]" />

        {/* Subtle grid, matches the pattern used on ServicesHero/etc. */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="absolute inset-0 hidden lg:block pointer-events-none overflow-hidden">
        {FLOATING_ICONS.map(({ icon: Icon, className, color, delay }, index) => (
          <motion.div
            key={index}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
            className={`absolute flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/80 shadow-lg shadow-slate-200/40 dark:shadow-black/30 backdrop-blur-sm ${className}`}
          >
            <Icon className={`h-5 w-5 ${color}`} />
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-800/40 bg-indigo-50/50 dark:bg-indigo-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Careers at QA Solucity
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl"
        >
          Help us build{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            better quality.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400"
        >
          We help businesses ship better software and help QA professionals build their careers.
          If that sounds like work worth doing, we&apos;d like to meet you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {BADGES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <Icon className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#open-roles"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group mt-10 inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-[15px] font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/30"
          >
            See open roles
          </a>
        </motion.div>
      </div>
    </div>
  );
}
