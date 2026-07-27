"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import ContactHeroContent from "./ContactHeroContent";
import ContactHeroStats from "./ContactHeroStats";

export default function ContactHero() {
  return (
    <Section className="relative overflow-hidden pt-40 pb-28 bg-[#FCFBF8]">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Glows */}
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
          className="absolute -left-24 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/40 blur-[160px]"
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
          className="absolute -right-24 top-20 h-[450px] w-[450px] rounded-full bg-violet-100/40 blur-[180px]"
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

        {/* Radial fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 30%, rgba(252,251,248,0.6) 100%)",
          }}
        />
      </div>

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_420px]">
          <ContactHeroContent />
          <ContactHeroStats />
        </div>
      </Container>
    </Section>
  );
}