"use client";

import { motion } from "framer-motion";
import { Globe2 } from "lucide-react";

export default function CertificationHero() {
  return (
    <div className="relative overflow-hidden bg-[#FCFBF8] dark:bg-[#020617] pt-40 pb-20">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -left-24 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/25 blur-[160px]" />
        <div className="absolute -right-24 top-20 h-[450px] w-[450px] rounded-full bg-violet-100/40 dark:bg-violet-900/25 blur-[160px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl px-6 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-800/40 bg-indigo-50/50 dark:bg-indigo-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 backdrop-blur-sm">
          <Globe2 className="h-3.5 w-3.5" />
          Independent ISTQB Prep Program
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl">
          Your QA career is{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
            globally recognized
          </span>{" "}
          from here.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
          Two ways to prepare for your ISTQB certification with QA Solucity — train
          independently and register for your exam yourself when you&apos;re ready, or let
          us handle the entire journey, exam voucher included, in one Naira payment.
        </p>
      </motion.div>
    </div>
  );
}
