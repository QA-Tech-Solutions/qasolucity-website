"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap } from "lucide-react";

const whatWeDo = [
  {
    icon: Building2,
    title: "For Businesses",
    description:
      "Software testing, QA support and quality engineering for websites and digital products.",
  },
  {
    icon: GraduationCap,
    title: "For QA Professionals",
    description:
      "Training, certification pathways and opportunities to build practical QA experience.",
  },
];

export default function AboutHeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-2xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30 lg:p-10">
        {/* Decorative glow */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100/20 blur-3xl pointer-events-none" />

        <span className="relative text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          What We Do
        </span>

        <div className="relative mt-8 space-y-6">
          {whatWeDo.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="flex gap-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-6 transition-all duration-300 hover:shadow-md hover:shadow-indigo-200/50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200/50">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{title}</h4>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}