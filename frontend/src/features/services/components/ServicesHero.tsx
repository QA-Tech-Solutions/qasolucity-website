"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { serviceCategories } from "../data/services";

export default function ServicesHero() {
  return (
    <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8f7ff_0%,_#eef2ff_45%,_#fdf2f8_100%)] pt-36 pb-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-0 h-[480px] w-[480px] rounded-full bg-indigo-200/40 blur-[140px]"
        />
        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [10, -10, 10],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-24 top-1/4 h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-[150px]"
        />
        <div className="absolute bottom-[-10%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-200/30 blur-[140px]" />

        {/* Subtle grid */}
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
            Our Services
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-slate-900 md:text-5xl lg:text-6xl">
            Services designed to make{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              release quality feel effortless.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            From hands-on testing to advisory support and team enablement, we
            help product teams build reliable software without slowing down
            delivery.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="group inline-flex h-14 items-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
              >
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#services"
                className="inline-flex h-14 items-center rounded-2xl border border-slate-300 bg-white/80 px-8 font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 hover:bg-white"
              >
                Explore Services
              </a>
            </motion.div>
          </div>

          {/* Category quick nav */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-3"
          >
            {serviceCategories.map((category) => (
              <a
                key={category.name}
                href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full border border-slate-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md"
              >
                {category.name}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
