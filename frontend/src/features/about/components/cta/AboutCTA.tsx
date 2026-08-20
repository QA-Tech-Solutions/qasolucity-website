"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import AboutCTAContent from "./AboutCTAContent";
import AboutCTAHighlights from "./AboutCTAHighlights";

export default function AboutCTA() {
  return (
    <Section className="relative overflow-hidden py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950" />

      {/* Animated Glows */}
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-10, 10, -10],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[150px]"
      />
      <motion.div
        animate={{
          x: [20, -20, 20],
          y: [10, -10, 10],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[180px]"
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 px-10 py-20 text-white shadow-[0_40px_100px_rgba(15,23,42,.45)] lg:px-20"
        >
          {/* Inner Glows */}
          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[160px]" />

          <div className="relative">
            <AboutCTAContent />
            <AboutCTAHighlights />
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}