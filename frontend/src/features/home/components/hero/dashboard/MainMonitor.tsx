"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Globe,
  Server,
  Smartphone,
} from "lucide-react";

export default function MainMonitor() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative w-[420px] overflow-hidden rounded-[36px] border border-slate-100 bg-white shadow-[0_40px_100px_rgba(15,23,42,.12)]"
    >
      {/* Header */}
      <div className="border-b border-slate-100 px-8 py-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-emerald-700">
              Live
            </span>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          QA SOLUCITY
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          QA Command Center
        </h2>
      </div>

      {/* Chart */}
      <div className="px-8 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Regression Trend
            </p>

            <h3 className="mt-1 text-3xl font-bold">
              94%
            </h3>
          </div>

          <Activity className="h-7 w-7 text-indigo-600" />
        </div>

        <svg
          viewBox="0 0 320 150"
          className="h-44 w-full"
        >
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              x2="100%"
            >
              <stop
                offset="0%"
                stopColor="#6366F1"
              />

              <stop
                offset="100%"
                stopColor="#4338CA"
              />
            </linearGradient>
          </defs>

          <path
            d="
                M0 110
                C40 80
                70 90
                110 60
                S170 20
                210 70
                S270 130
                320 40
            "
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Bottom KPI */}
      <div className="grid grid-cols-3 gap-4 px-8 pb-8">
        <div className="rounded-2xl bg-slate-50 p-4">
          <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-500" />

          <p className="text-xs text-slate-500">
            Passed
          </p>

          <h4 className="mt-2 text-2xl font-bold">
            2,548
          </h4>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <Server className="mb-3 h-5 w-5 text-indigo-600" />

          <p className="text-xs text-slate-500">
            APIs
          </p>

          <h4 className="mt-2 font-bold">
            Healthy
          </h4>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <div className="mb-3 flex gap-2">
            <Globe className="h-4 w-4 text-indigo-600" />
            <Smartphone className="h-4 w-4 text-indigo-600" />
          </div>

          <p className="text-xs text-slate-500">
            Platforms
          </p>

          <h4 className="mt-2 text-sm font-bold">
            Web • Mobile
          </h4>
        </div>
      </div>
    </motion.div>
  );
}