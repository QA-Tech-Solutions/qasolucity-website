"use client";

import { motion } from "framer-motion";
import AboutHeroActions from "./AboutHeroActions";
import AboutHeroBadge from "./AboutHeroBadge";

export default function AboutHeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AboutHeroBadge />

      <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
        Building confidence through{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          quality engineering.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
        QA Solucity partners with startups, scale-ups and enterprise
        teams to build reliable software through modern quality
        assurance, automation and quality engineering practices.
      </p>

      <AboutHeroActions />
    </motion.div>
  );
}