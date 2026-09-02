"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

export default function FaqHero() {
  return (
    <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#fdf2f8_100%)] dark:bg-[linear-gradient(135deg,_#020617_0%,_#0b0f2e_50%,_#1a0e1f_100%)] pt-36 pb-16">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-0 h-[480px] w-[480px] rounded-full bg-indigo-200/40 blur-[140px]"
        />
        <motion.div
          animate={{ x: [20, -20, 20], y: [10, -10, 10], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-24 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-[150px]"
        />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-800/40 bg-white/70 dark:bg-slate-900/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400 backdrop-blur-sm">
            FAQs
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-slate-100 md:text-5xl lg:text-6xl">
            Answers to what{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              teams ask us most.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400 md:text-xl">
            Everything about our services, resources, and how we work,
            gathered in one place.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
