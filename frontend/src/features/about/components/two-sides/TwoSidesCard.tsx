"use client";

import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  number: string;
  icon: LucideIcon;
  audience: string;
  title: string;
  description: string;
  button: string;
  href: string;
  delay?: number;
}

export default function TwoSidesCard({
  number,
  icon: Icon,
  audience,
  title,
  description,
  button,
  href,
  delay = 0,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[34px] border border-slate-200/80 bg-white p-10 transition-all duration-500 hover:border-indigo-200 hover:shadow-[0_35px_80px_rgba(79,70,229,.12)]"
    >
      {/* Decorative glow */}
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-100/30 blur-3xl transition-opacity duration-500 group-hover:opacity-75" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-violet-100 shadow-md ring-1 ring-slate-200/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-200/50">
          <Icon className="h-6 w-6 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <span className="text-6xl font-black text-slate-100 transition-colors duration-300 group-hover:text-indigo-100">
          {number}
        </span>
      </div>

      <span className="relative mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
        {audience}
      </span>

      <h3 className="relative mt-3 text-3xl font-bold leading-tight text-slate-900 lg:text-4xl">
        {title}
      </h3>

      <p className="relative mt-6 flex-1 text-base leading-8 text-slate-600 lg:text-lg">
        {description}
      </p>

      <Link
        href={href}
        className="group/link relative mt-8 inline-flex w-fit items-center gap-2 font-semibold text-indigo-600 transition-colors duration-300 hover:text-indigo-700"
      >
        {button}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
      </Link>
    </motion.div>
  );
}
