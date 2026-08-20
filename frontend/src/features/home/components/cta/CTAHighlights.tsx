"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Clock } from "lucide-react";

const highlights = [
  {
    title: "Rigorous QA Process",
    description: "Structured, thorough testing across every release cycle.",
    icon: ShieldCheck,
    color: "from-indigo-400 to-indigo-300",
  },
  {
    title: "Dedicated Engineers",
    description: "A hands-on team that treats your product like their own.",
    icon: Users,
    color: "from-emerald-400 to-emerald-300",
  },
  {
    title: "Always Available",
    description: "Support around the clock, whenever you need us.",
    icon: Clock,
    color: "from-violet-400 to-violet-300",
  },
];

// Highlight Card
const HighlightCard = ({
  title,
  description,
  icon: Icon,
  color,
  delay = 0,
}: {
  title: string;
  description: string;
  icon: any;
  color: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
    >
      {/* Inner Glow */}
      <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-white/5 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="mt-3 text-slate-300">{description}</p>
        </div>
        <div className={`shrink-0 rounded-xl bg-gradient-to-br ${color} p-2.5 shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default function CTAHighlights() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-5"
    >
      {highlights.map((highlight, index) => (
        <HighlightCard
          key={highlight.title}
          {...highlight}
          delay={0.2 + index * 0.15}
        />
      ))}
    </motion.div>
  );
}
