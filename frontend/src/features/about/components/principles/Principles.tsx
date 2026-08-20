"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import Principle from "./Principle";
import PrinciplesHeader from "./PrinciplesHeader";
import { principles } from "./principles-data";

export default function Principles() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50/40 py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Stronger animated glows */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 top-1/2 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-200/25 blur-3xl"
        />

        {/* Decorative dots */}
        <div className="absolute top-20 right-20 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-indigo-400" />
          ))}
        </div>
        <div className="absolute bottom-20 left-20 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-violet-400" />
          ))}
        </div>

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

        {/* Radial fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.2) 100%)",
          }}
        />
      </div>

      <Container>
        <PrinciplesHeader />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="mx-auto mt-16 max-w-6xl lg:mt-24"
        >
          {principles.map((principle, index) => (
            <Principle key={principle.title} index={index} {...principle} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}