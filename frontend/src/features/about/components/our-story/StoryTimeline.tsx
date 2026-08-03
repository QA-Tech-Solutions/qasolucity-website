"use client";

import { motion } from "framer-motion";

const steps = ["Discover", "Quality", "Automation", "Innovation"];

export default function StoryTimeline() {
  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, duration: 0.4 }}
          className="relative flex items-center gap-5"
        >
          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/20">
            {index + 1}
          </div>

          <h3 className="text-xl font-semibold text-slate-800">{step}</h3>

          {index !== steps.length - 1 && (
            <div className="absolute left-6 top-12 h-10 w-px bg-slate-200" />
          )}
        </motion.div>
      ))}
    </div>
  );
}