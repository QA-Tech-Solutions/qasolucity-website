"use client";

import { services } from "./services-data";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

export default function ServiceGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
    >
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          <ServiceCard
            {...service}
            featured={service.featured}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}