"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SolutionsHero() {
  return (
    <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#fdfcfb_0%,_#f5f3ff_44%,_#eef2ff_100%)] pt-36 pb-24">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-0 h-[480px] w-[480px] rounded-full bg-indigo-200/40 blur-[140px]"
        />
        <motion.div
          animate={{ x: [20, -20, 20], y: [10, -10, 10], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-24 top-1/4 h-[500px] w-[500px] rounded-full bg-sky-200/35 blur-[150px]"
        />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
            </span>
            Our Solutions
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-slate-900 md:text-5xl lg:text-6xl">
            Solutions that turn{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              quality into a business advantage.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Whether you're launching a new product, scaling releases, or
            tightening delivery processes, we bring the right mix of
            testing, strategy, and execution support.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
              >
                Talk to Our Team
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#solutions"
                className="inline-flex h-14 items-center rounded-2xl border border-slate-300 bg-white/80 px-8 font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 hover:bg-white"
              >
                Explore Solutions
              </a>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
