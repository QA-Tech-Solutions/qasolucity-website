"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Smile, Clock } from "lucide-react";

const metrics = [
  {
    value: 100,
    label: "Projects Tested",
    icon: Users,
    suffix: "+",
    color: "from-indigo-400 to-indigo-300",
  },
  {
    value: 99,
    label: "Client Satisfaction",
    icon: Smile,
    suffix: "%",
    color: "from-emerald-400 to-emerald-300",
  },
  {
    value: 24,
    label: "Hour Support",
    icon: Clock,
    suffix: "/7",
    color: "from-violet-400 to-violet-300",
  },
];

// Count-up hook
const useCountUp = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
};

// Animated Metric Card
const MetricCard = ({
  value,
  label,
  icon: Icon,
  suffix,
  color,
  delay = 0,
}: {
  value: number;
  label: string;
  icon: any;
  suffix: string;
  color: string;
  delay?: number;
}) => {
  const count = useCountUp(value);

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

      <div className="relative flex items-start justify-between">
        <div>
          <h3 className="text-5xl font-bold text-white">
            {count}
            {suffix}
          </h3>
          <p className="mt-3 text-slate-300">{label}</p>
        </div>
        <div className={`rounded-xl bg-gradient-to-br ${color} p-2.5 shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Decorative progress bar */}
      <div className="relative mt-4 h-1 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.5, duration: 1.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
};

export default function CTAMetrics() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-5"
    >
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.label}
          {...metric}
          delay={0.2 + index * 0.15}
        />
      ))}
    </motion.div>
  );
}