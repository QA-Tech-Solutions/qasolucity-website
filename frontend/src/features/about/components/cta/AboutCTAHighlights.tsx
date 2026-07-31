"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Shield, Users } from "lucide-react";

const highlights = [
  { label: "Quality Engineering", icon: CheckCircle2 },
  { label: "Automation First", icon: Sparkles },
  { label: "Enterprise Ready", icon: Shield },
  { label: "Trusted Partnership", icon: Users },
];

export default function AboutCTAHighlights() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
      className="mt-12 flex flex-wrap justify-center gap-3"
    >
      {highlights.map((item) => (
        <motion.span
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
        >
          <item.icon className="h-4 w-4 text-indigo-300" />
          {item.label}
        </motion.span>
      ))}
    </motion.div>
  );
}