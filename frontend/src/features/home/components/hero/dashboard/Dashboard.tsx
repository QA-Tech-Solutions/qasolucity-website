"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  Bug,
  ShieldCheck,
  Zap,
  Activity,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { QualityMetrics } from "@/lib/quality-metrics-store";
import Tooltip from "@/components/ui/Tooltip";

interface TrendPoint {
  timestamp: string;
  passRate: number;
}

// "6h ago" / "3d ago" - coarse on purpose. The automation behind this
// runs about once a day (see qasolucity-automation's scheduled-run.yml),
// so minute-level precision would just be noise; this only needs to
// answer "is this actually recent."
function formatRelativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.round(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay}d ago`;
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

// Real pass-rate history for the chart below - a flat/short line when
// there's not enough run history yet (a fresh deployment, or local dev)
// rather than the fabricated trend this card used to show regardless of
// what actually happened.
const TrendPath = ({ points }: { points: TrendPoint[] }) => {
  if (points.length < 2) {
    return (
      <div className="flex h-[92px] items-center justify-center text-xs text-slate-500">
        Trend line appears after a few more runs.
      </div>
    );
  }

  const width = 400;
  const height = 92;
  const rates = points.map((p) => p.passRate);
  const minRate = Math.min(...rates, 80);
  const maxRate = Math.max(...rates, 100);
  const range = Math.max(maxRate - minRate, 1);

  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * width,
    y: height - ((p.passRate - minRate) / range) * height,
  }));
  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${width} ${height} L0 ${height} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-[92px] w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="qccChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill="url(#qccChartGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke="#a5b4fc"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
      />
    </svg>
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

// A short, recent window for the sparkline - this card is a teaser, not
// the full trend view (that's /dashboard/analytics's job), so it only
// needs enough points to show direction at a glance.
const TREND_POINTS = 14;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`status ${response.status}`);
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<QualityMetrics>(FALLBACK_METRICS);
  const [trend, setTrend] = useState<TrendPoint[]>([]);
  const [isFetchFailing, setIsFetchFailing] = useState(false);

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
      const [metricsData, trendData] = await Promise.all([
        fetchJson<QualityMetrics>("/api/quality-metrics"),
        fetchJson<{ trend: TrendPoint[] }>(`/api/quality-metrics/trend?limit=${TREND_POINTS}`),
      ]);
      if (cancelled) return;
      applyFetchResult(metricsData);
      if (trendData) setTrend(trendData.trend);
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
  const relativeUpdated = lastUpdated ? formatRelativeTime(new Date(lastUpdated)) : null;

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
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-500/30 blur-3xl"
      />

      <div className="relative">
        {/* Header */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-start gap-3"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20"
          >
            <ShieldCheck className="h-5 w-5 text-indigo-400" />
          </motion.div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white">Quality Command Center</h3>
            {/* States the dogfooding claim in plain words up front, rather
                than behind a hover-only info icon almost nobody finds. */}
            <p className="text-xs leading-5 text-slate-400">
              We run this exact automation against qasolucity.com. Every day. No staging, no cherry-picking.
            </p>
          </div>
        </motion.div>

        {/* Live badge */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-3"
        >
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
              className={`inline-flex w-fit cursor-help items-center gap-1.5 rounded-full px-3 py-1 ${
                isLive ? "bg-emerald-500/20" : "bg-slate-500/20"
              }`}
              data-testid="qcc-live-badge"
              data-live={isLive}
            >
              <span className="relative flex h-2 w-2">
                {isLive && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${isLive ? "bg-emerald-400" : "bg-slate-400"}`} />
              </span>
              <span className={`text-xs font-medium ${isLive ? "text-emerald-400" : "text-slate-400"}`}>
                {isLive ? "Live" : "Baseline"}
              </span>
              {isLive && relativeUpdated && (
                <>
                  <span className="text-emerald-400/40">&middot;</span>
                  <span className="text-xs font-medium text-emerald-400" data-testid="qcc-last-updated">
                    last run {relativeUpdated}
                  </span>
                </>
              )}
            </div>
          </Tooltip>
        </motion.div>

        {/* Pass rate + chart */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-5"
        >
          <p className="text-sm text-slate-400">Test pass rate</p>
          <h4 className="text-3xl font-bold text-white" data-testid="qcc-pass-rate">
            <AnimatedNumber value={passRate} suffix="%" duration={800} />
          </h4>
          <div className="mt-3">
            <TrendPath points={trend} />
          </div>
        </motion.div>

        {/* KPI Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
          }}
          initial="hidden"
          animate="visible"
          className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <KPICard icon={CheckCircle2} label="Passed" value={passedTests} color="emerald" delay={0.1} testId="qcc-passed" />
          <KPICard icon={Bug} label="Bugs" value={bugs} color="red" delay={0.2} testId="qcc-bugs" />
          <KPICard icon={Zap} label="Test Coverage" value={coverage} suffix="%" color="amber" delay={0.3} testId="qcc-coverage" />
          <KPICard
            icon={Activity}
            label="Site Health"
            value={apiHealth}
            color={apiHealth === "Healthy" ? "emerald" : "red"}
            delay={0.4}
            testId="qcc-api-health"
          />
        </motion.div>

        {/* Pitch band - the explicit tie-back from "we automate our own
            testing" to "this is a service you can buy." Test Automation is
            one of the ten Full-Cycle Testing Services, so the button goes
            straight to that page rather than a generic /contact. */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-5 rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/25 to-violet-500/20 p-4"
        >
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/15">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <p className="text-[13px] leading-5 text-indigo-50">
              This is <strong className="text-white">Test Automation</strong>, one of our core services -
              running on us, so you can see exactly what it looks like running on you.
            </p>
          </div>

          <Link
            href="/services/automation-testing"
            className="group mt-3 flex h-10 items-center justify-center gap-1.5 rounded-xl bg-white text-[13px] font-semibold text-indigo-800 transition-transform duration-200 hover:scale-[1.02]"
            data-testid="qcc-automation-cta"
          >
            Get Test Automation
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/dashboard"
            className="mt-2.5 flex items-center justify-center gap-1 text-[11.5px] text-indigo-200/80 transition-colors duration-300 hover:text-indigo-100"
            data-testid="qcc-dashboard-link"
          >
            or view the full live dashboard
            <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
