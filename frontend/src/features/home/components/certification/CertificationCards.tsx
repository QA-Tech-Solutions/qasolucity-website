"use client";

import { certificationCards } from "./certification-data";
import CertificationCard from "./CertificationCard";
import { motion } from "framer-motion";

export default function CertificationCards() {
  return (
    <div className="mt-16">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-3xl font-bold leading-tight text-slate-900 dark:text-slate-100 md:text-4xl"
      >
        Two Paths.{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          One Career.
        </span>
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 grid gap-8 lg:grid-cols-2"
      >
        {certificationCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
          >
            <CertificationCard {...card} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}