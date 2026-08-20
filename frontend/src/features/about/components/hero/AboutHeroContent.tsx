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

      <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-5xl">
        Building{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          better software.
        </span>
        <br />
        Building{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          better QA careers.
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
        QA Solucity helps businesses test and improve their digital
        products while creating pathways for aspiring and growing QA
        professionals through practical training, industry-recognised
        certifications and real-world opportunities.
      </p>

      <AboutHeroActions />
    </motion.div>
  );
}