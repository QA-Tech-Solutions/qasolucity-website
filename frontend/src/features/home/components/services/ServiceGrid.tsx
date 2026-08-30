"use client";

import { services } from "./services-data";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

export default function ServiceGrid() {
  return (
    // Plain div: staggerChildren/delayChildren only propagate to children
    // that opt in via `variants`, which these don't (they set their own
    // initial/whileInView below), so this wrapper doing its own opacity
    // animation on top of theirs was just a second, redundant fade nested
    // around every card's - the two compound multiplicatively and made
    // the whole section noticeably slower to finish appearing.
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
        >
          <ServiceCard
            {...service}
            featured={service.featured}
          />
        </motion.div>
      ))}
    </div>
  );
}