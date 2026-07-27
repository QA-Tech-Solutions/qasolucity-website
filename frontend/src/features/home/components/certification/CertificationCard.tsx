"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  button: string;
  variant: "primary" | "secondary";
}

export default function CertificationCard({
  title,
  description,
  button,
  variant,
}: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-visible rounded-[34px] border border-slate-200/80 bg-gradient-to-br from-white via-white to-indigo-50/30 px-10 pb-10 pt-14 text-center transition-all duration-500 hover:border-indigo-200 hover:shadow-[0_35px_80px_rgba(79,70,229,.12)]"
    >
      {/* Glow effects – stay subtle */}
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-200/20 blur-3xl transition-opacity duration-500 group-hover:opacity-75" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-violet-200/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -top-7 left-10 z-20"
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl ring-8 ring-[#FCFBF8]">
          <Image
            src="/icons/badge.svg"
            alt="Badge"
            width={38}
            height={38}
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 -z-10 rounded-full bg-indigo-400/0 transition-all duration-500 group-hover:bg-indigo-400/10 group-hover:scale-110" />
        </div>
      </motion.div>

      <div className="relative z-10">
        <h3 className="mx-auto max-w-[240px] whitespace-pre-line text-[38px] font-bold leading-tight tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-indigo-800 sm:max-w-xs md:max-w-sm">
          {title}
        </h3>

        <p className="mx-auto mt-6 max-w-md text-[19px] leading-8 text-slate-500">
          {description}
        </p>

        {/* Button with enhanced hover effects */}
        <Button
          className={`group/btn mt-10 h-14 rounded-2xl px-8 text-[15px] font-semibold transition-all duration-300 ${
            variant === "primary"
              ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 hover:scale-105 hover:from-indigo-700 hover:to-violet-700 hover:shadow-indigo-500/30"
              : "border border-indigo-200 bg-white text-indigo-600 shadow-sm hover:scale-105 hover:bg-indigo-50 hover:shadow-lg hover:shadow-indigo-100/50"
          }`}
        >
          {button}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </div>
    </motion.article>
  );
}