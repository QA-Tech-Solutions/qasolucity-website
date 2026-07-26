"use client";

import { certificationCards } from "./certification-data";
import CertificationCard from "./CertificationCard";
import { motion } from "framer-motion";

export default function CertificationCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-16 grid gap-8 lg:grid-cols-2"
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
  );
}