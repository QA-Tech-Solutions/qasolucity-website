"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <Section className="relative bg-[#FCFBF8] dark:bg-[#020617] pt-28 pb-24 lg:min-h-screen">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        
        {/* Center Glow – Pulsing */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-100/35 dark:bg-indigo-900/25 blur-[140px]"
        />

        {/* Left Glow – Drifting */}
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-10, 15, -10],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-48 top-10 h-[600px] w-[600px] rounded-full bg-slate-100/60 dark:bg-slate-800/30 blur-[140px]"
        />

        {/* Right Glow – Drifting Opposite */}
        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [10, -15, 10],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -right-48 top-20 h-[550px] w-[550px] rounded-full bg-violet-100/40 dark:bg-violet-900/25 blur-[140px]"
        />

        {/* Subtle Brand Accent – Faint "QA" Monogram */}
        <div className="absolute bottom-0 right-0 select-none opacity-[0.03]">
          <span className="text-[200px] font-black leading-none tracking-[-0.08em] text-slate-900 dark:text-slate-100">
            QA
          </span>
        </div>

        {/* Grid Pattern – Slightly more visible. Two divs because the
            line color is baked into an inline backgroundImage, which a
            dark: className variant can't override. */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(15 23 42 / 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(15 23 42 / 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute inset-0 hidden opacity-[0.05] dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(255 255 255 / 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(255 255 255 / 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Soft Radial Fade – Keeps focus on content */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(252,251,248,0.3)_70%,#FCFBF8_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.4)_70%,#020617_100%)]" />
      </div>

      {/* ===== CONTENT ===== */}
      <Container>
        <div className="grid min-h-[82vh] items-start gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="order-1 self-start lg:col-span-7 lg:sticky lg:top-28 lg:pt-10">
            <HeroContent />
          </div>

          <div className="order-2 mt-8 lg:col-span-5 lg:mt-0">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}