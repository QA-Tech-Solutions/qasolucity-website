"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SolutionsCTA() {
  return (
    <Section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950" />

      <motion.div
        animate={{ x: [-20, 20, -20], y: [-10, 10, -10], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[150px]"
      />
      <motion.div
        animate={{ x: [20, -20, 20], y: [10, -10, 10], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[180px]"
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[40px] bg-white/[0.03] border border-white/10 px-10 py-16 text-white lg:px-14 lg:py-20"
        >
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Let's Solve It Together
            </span>

            <h3 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Bring the right quality{" "}
              <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                approach
              </span>{" "}
              to what matters most.
            </h3>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Share your roadmap, timeline, and goals and we'll recommend the
              best fit for your team and product.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center rounded-2xl bg-white px-8 text-slate-900 font-semibold shadow-lg shadow-white/10 transition-all duration-300 hover:bg-slate-100 hover:shadow-white/20"
              >
                Start the Conversation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#solutions"
                className="inline-flex h-14 items-center rounded-2xl border border-white/20 bg-transparent px-8 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                Review Solutions Again
              </a>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
