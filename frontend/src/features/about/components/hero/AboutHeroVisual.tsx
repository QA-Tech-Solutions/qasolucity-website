"use client";

import { motion } from "framer-motion";

export default function AboutHeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-2xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30 lg:p-10">
        {/* Decorative glow */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100/20 blur-3xl pointer-events-none" />

        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Our Purpose
        </span>

        <h3 className="mt-6 text-3xl font-bold text-slate-900">
          Quality is more than testing.
        </h3>

        <p className="mt-6 leading-8 text-slate-600">
          We believe software quality should be embedded throughout
          the development lifecycle, not inspected at the end.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-6 transition-all duration-300 hover:shadow-md hover:shadow-indigo-200/50"
          >
            <h4 className="text-4xl font-bold text-indigo-600">100%</h4>
            <p className="mt-2 text-sm text-slate-600">Quality Focus</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-6 transition-all duration-300 hover:shadow-md hover:shadow-indigo-200/50"
          >
            <h4 className="text-4xl font-bold text-indigo-600">24h</h4>
            <p className="mt-2 text-sm text-slate-600">Average Response</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}