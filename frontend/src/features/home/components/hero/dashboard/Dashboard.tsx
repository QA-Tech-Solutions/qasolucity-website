"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import {
  Activity,
  CheckCircle2,
  Bug,
  ShieldCheck,
  Zap,
  TrendingUp,
  Info,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { QualityMetrics } from "@/lib/quality-metrics-store";
import Tooltip from "@/components/ui/Tooltip";

// 12-hour clock with AM/PM plus a same-day-relative date label, e.g.
// "6:44 AM • Today" - spelled out explicitly (hour12: true) rather than
// left to the runtime's default locale, which isn't always 12-hour.
function formatLastUpdated(date: Date): string {
  // .toUpperCase() guarantees "AM"/"PM" (not "am"/"pm") regardless of the
  // runtime's locale/ICU data, which isn't consistent about casing here.
  const time = date
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .toUpperCase();
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
  const dateLabel = isToday ? "Today" : date.toLocaleDateString([], { month: "short", day: "numeric" });
  return `${time} • ${dateLabel}`;
}

// Helper: count-up animation. Animates from whatever is currently on
// screen to the new target, rather than always restarting from 0 - the
// dashboard polls for fresh data every 60s, and resetting to 0 on every
// poll would make a live metric look like it just broke.
const useCountUp = (target: number, duration: number = 1200) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const startValue = countRef.current;
    const delta = target - startValue;
    if (delta === 0) return;

    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const next = Math.round(startValue + delta * progress);
      countRef.current = next;
      setCount(next);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
};

// Animated number component
const AnimatedNumber = ({ value, suffix = "", duration = 1200 }: { value: number; suffix?: string; duration?: number }) => {
  const count = useCountUp(value, duration);
  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

// KPI Card with hover lift
const KPICard = ({
  icon: Icon,
  label,
  value,
  suffix = "",
  color = "indigo",
  delay = 0,
  dynamicValue,
  testId,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  suffix?: string;
  color?: "indigo" | "emerald" | "red" | "amber";
  delay?: number;
  dynamicValue?: number | string;
  testId?: string;
}) => {
  const colorMap = {
    indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/20",
    emerald: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20",
    red: "from-red-500/20 to-red-600/10 border-red-500/20",
    amber: "from-amber-500/20 to-amber-600/10 border-amber-500/20",
  };
  const iconColorMap = {
    indigo: "text-indigo-400",
    emerald: "text-emerald-400",
    red: "text-red-400",
    amber: "text-amber-400",
  };

  const displayValue = dynamicValue !== undefined ? dynamicValue : value;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`rounded-2xl bg-gradient-to-br ${colorMap[color]} border backdrop-blur-sm p-4 transition-shadow hover:shadow-lg hover:shadow-${color}-500/10`}
    >
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColorMap[color]}`} />
        <span className="text-xs font-medium text-slate-400">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold text-white" data-testid={testId}>
        {typeof displayValue === "number" ? (
          <AnimatedNumber value={displayValue} suffix={suffix} duration={1000} />
        ) : (
          displayValue
        )}
      </p>
    </motion.div>
  );
};

// Shown immediately on mount so the card never renders empty while the
// first fetch is in flight; overwritten as soon as /api/quality-metrics
// responds.
const FALLBACK_METRICS: QualityMetrics = {
  passRate: 94,
  passedTests: 2548,
  totalTests: 2710,
  bugs: 3,
  coverage: 92,
  apiHealth: "Healthy",
  lastUpdated: null,
  source: "seed",
};

// How often the dashboard polls for a fresh automation run. CI runs the
// suite on its own schedule (see qasolucity-automation); this just keeps
// an open tab in sync with whatever the latest run reported.
const POLL_INTERVAL_MS = 60_000;

async function loadMetrics(): Promise<QualityMetrics | null> {
  try {
    const response = await fetch("/api/quality-metrics", { cache: "no-store" });
    if (!response.ok) throw new Error(`status ${response.status}`);
    return (await response.json()) as QualityMetrics;
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<QualityMetrics>(FALLBACK_METRICS);
  const [isFetchFailing, setIsFetchFailing] = useState(false);

  // Chart line animation control
  const chartControls = useAnimation();

  useEffect(() => {
    chartControls.start({
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" },
    });
  }, [chartControls]);

  const applyFetchResult = useCallback((data: QualityMetrics | null) => {
    if (data) {
      setMetrics(data);
      setIsFetchFailing(false);
    } else {
      // Leave the last-known metrics on screen rather than clearing them;
      // only the "Live" badge reflects that we're now stale.
      setIsFetchFailing(true);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      const data = await loadMetrics();
      if (!cancelled) applyFetchResult(data);
    };

    poll();
    const interval = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [applyFetchResult]);

  const { passRate, passedTests, bugs, coverage, apiHealth, lastUpdated, source } = metrics;
  // "Live" only when a real automation run has reported in and the most
  // recent poll succeeded - never claim real-time data we don't have.
  const isLive = source === "automation" && !isFetchFailing;
  const lastUpdatedLabel = lastUpdated ? formatLastUpdated(new Date(lastUpdated)) : "No automation run yet";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-4 shadow-2xl shadow-indigo-500/20 transition-all duration-300 sm:p-6"
      data-testid="quality-command-center"
    >
      {/* Animated Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl"
      />

      <div className="relative">
        {/* Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20"
            >
              <ShieldCheck className="h-5 w-5 text-indigo-400" />
            </motion.div>
            <div>
              <Tooltip
                asChild
                side="bottom"
                content="We run our own automated QA suite against qasolucity.com daily, and this card reflects the latest results."
              >
                <div className="group/qcc flex w-fit cursor-help items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-white">Quality Command Center</h3>
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors group-hover/qcc:text-slate-300">
                    <Info className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Tooltip>
              <p className="text-xs text-slate-400">Live test results for qasolucity.com</p>
            </div>
          </div>
          <Tooltip
            asChild
            side="bottom"
            content={
              isLive
                ? "Reporting real results from our automated test suite running against qasolucity.com."
                : "Showing baseline numbers while we wait for the first automated test run to report in."
            }
          >
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1 ${
                isLive ? "bg-emerald-500/20" : "bg-slate-500/20"
              }`}
              data-testid="qcc-live-badge"
              data-live={isLive}
            >
              <span className="relative flex h-2 w-2">
                {isLive && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    isLive ? "bg-emerald-400" : "bg-slate-400"
                  }`}
                />
              </span>
              <span
                className={`text-xs font-medium ${isLive ? "text-emerald-400" : "text-slate-400"}`}
              >
                {isLive ? "Live" : "Baseline"}
              </span>
            </div>
          </Tooltip>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Test Pass Rate</p>
              <h4 className="text-3xl font-bold text-white" data-testid="qcc-pass-rate">
                <AnimatedNumber value={passRate} suffix="%" duration={800} />
              </h4>
            </div>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrendingUp 
                className={`h-6 w-6 ${passRate >= 95 ? 'text-emerald-400' : passRate >= 92 ? 'text-amber-400' : 'text-red-400'}`}
              />
            </motion.div>
          </div>
          <div className="mt-4 h-28 w-full">
            <svg viewBox="0 0 400 120" className="h-full w-full">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#818CF8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area under line */}
              <motion.path
                d="M0 100 L40 80 L80 90 L120 60 L160 70 L200 40 L240 60 L280 30 L320 50 L360 20 L400 40 L400 120 L0 120 Z"
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
              {/* Line with draw animation */}
              <motion.path
                d="M0 100 L40 80 L80 90 L120 60 L160 70 L200 40 L240 60 L280 30 L320 50 L360 20 L400 40"
                fill="none"
                stroke="#818CF8"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* KPI Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <KPICard
            icon={CheckCircle2}
            label="Passed"
            value={passedTests}
            color="emerald"
            delay={0.1}
            testId="qcc-passed"
          />
          <KPICard
            icon={Bug}
            label="Bugs"
            value={bugs}
            color="red"
            delay={0.2}
            testId="qcc-bugs"
          />
          <KPICard
            icon={Zap}
            label="Coverage"
            value={coverage}
            suffix="%"
            color="amber"
            delay={0.3}
            testId="qcc-coverage"
          />
          <KPICard
            icon={Activity}
            label="Site Health"
            value={apiHealth}
            color={apiHealth === "Healthy" ? "emerald" : "red"}
            delay={0.4}
            testId="qcc-api-health"
          />
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-4 flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500"
        >
          <span data-testid="qcc-last-updated">
            Last updated: <span className="text-slate-400">{lastUpdatedLabel}</span>
          </span>
          <Link
            href="/dashboard"
            className="group flex items-center gap-1 text-slate-500 transition-colors duration-300 hover:text-slate-300"
            data-testid="qcc-dashboard-link"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${apiHealth === "Healthy" ? "bg-green-400" : "bg-red-400 animate-pulse"}`} />
            {apiHealth === "Healthy" ? "All systems operational" : "API Degraded"}
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}