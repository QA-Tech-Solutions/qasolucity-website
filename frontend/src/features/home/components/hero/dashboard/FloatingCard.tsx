"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  rotate?: string;
  duration?: number;
}

export default function FloatingCard({
  title,
  value,
  subtitle,
  icon,
  className,
  rotate = "rotate-0",
  duration = 6,
}: FloatingCardProps) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "rounded-[24px] border border-slate-100 bg-white px-5 py-4 shadow-[0_25px_60px_rgba(15,23,42,.12)]",
        rotate,
        className
      )}
    >
      {icon && <div className="mb-3">{icon}</div>}

      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </h3>

      {subtitle && (
        <p className="mt-2 text-xs font-medium text-indigo-600">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}