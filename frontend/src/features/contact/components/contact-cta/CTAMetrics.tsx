"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Users } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    label: "Free Initial Consultation",
    color: "from-indigo-400 to-indigo-300",
  },
  {
    icon: CheckCircle2,
    label: "Enterprise Ready",
    color: "from-emerald-400 to-emerald-300",
  },
  {
    icon: Users,
    label: "Remote & On-site Support",
    color: "from-violet-400 to-violet-300",
  },
];

export default function CTAMetrics() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-col gap-4"
    >
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20"
        >
          <div className={`rounded-xl bg-gradient-to-br ${metric.color} p-2.5`}>
            <metric.icon className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-200">{metric.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}