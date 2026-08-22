"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import JourneyHeader from "./JourneyHeader";
import JourneyTimeline from "./JourneyTimeline";

export default function Journey() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-white dark:from-slate-900 via-white dark:via-slate-900 to-violet-50/30 dark:to-violet-950/30 py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 top-0 h-[450px] w-[450px] rounded-full bg-violet-200/25 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-200/25 blur-3xl"
        />

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
        <JourneyHeader />
        <JourneyTimeline />
      </Container>
    </Section>
  );
}
