"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import TwoSidesHeader from "./TwoSidesHeader";
import TwoSidesCard from "./TwoSidesCard";
import { twoSides } from "./two-sides-data";

export default function TwoSides() {
  return (
    <Section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-20 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-100/40 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
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
        <TwoSidesHeader />

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:mt-24 lg:grid-cols-2">
          {twoSides.map((side, index) => (
            <TwoSidesCard key={side.number} {...side} delay={index * 0.15} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
