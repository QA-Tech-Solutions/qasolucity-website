"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import AboutHeroContent from "./AboutHeroContent";
import AboutHeroVisual from "./AboutHeroVisual";

export default function AboutHero() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-slate-100 dark:from-slate-800 via-white dark:via-slate-900 to-white dark:to-slate-900 pt-44 pb-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Stronger animated glows */}
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
          className="absolute -left-28 top-24 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-[140px]"
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
          className="absolute -right-28 bottom-0 h-[550px] w-[550px] rounded-full bg-violet-200/30 blur-[180px]"
        />

        {/* Floating Blobs */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-[10%] h-32 w-32 rounded-full bg-indigo-200/20 blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-32 right-[15%] h-40 w-40 rounded-full bg-violet-200/20 blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-[60%] h-24 w-24 rounded-full bg-indigo-200/15 blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-[15%] right-[25%] h-28 w-28 rounded-full bg-violet-200/15 blur-2xl"
        />

        {/* Decorative dots */}
        <div className="absolute right-20 top-20 grid grid-cols-4 gap-3 opacity-20">
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(248,250,252,0.3)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.4)_100%)]" />
      </div>

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
          <AboutHeroContent />
          <AboutHeroVisual />
        </div>
      </Container>
    </Section>
  );
}