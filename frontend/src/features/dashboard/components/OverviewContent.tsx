"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Bug, Zap, Activity, ArrowUpRight, Clock, type LucideIcon } from "lucide-react";
import type { QualityMetrics } from "@/lib/quality-metrics-store";

interface TrendPoint {
  timestamp: string;
  passRate: number;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * A real chart built from actual run history, unlike the homepage
 * widget's line (that one is a fixed decorative path - it has no history
 * to draw from, since it only ever sees the latest snapshot).
 */
function TrendChart({ points }: { points: TrendPoint[] }) {
  if (points.length < 2) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500 dark:border-white/10">
        Not enough runs yet for a trend line.
      </div>
    );
  }

  const width = 800;
  const height = 160;
  const minRate = Math.min(...points.map((p) => p.passRate), 80);
  const maxRate = Math.max(...points.map((p) => p.passRate), 100);
  const range = Math.max(maxRate - minRate, 1);

  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * width,
    y: height - ((p.passRate - minRate) / range) * height,
  }));

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${width} ${height} L0 ${height} Z`;

  return (
    <div className="h-40 w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="overviewChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#overviewChartGradient)" />
        <path
          d={linePath}
          fill="none"
          stroke="#818CF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{formatDate(points[0].timestamp)}</span>
        <span>{formatDate(points[points.length - 1].timestamp)}</span>
      </div>
    </div>
  );
}

const KPI_STYLES = {
  indigo: {
    bg: "from-indigo-100/80 to-indigo-50/40 border-indigo-200 dark:from-indigo-500/20 dark:to-indigo-600/10 dark:border-indigo-500/20",
    icon: "text-indigo-600 dark:text-indigo-400",
  },
  emerald: {
    bg: "from-emerald-100/80 to-emerald-50/40 border-emerald-200 dark:from-emerald-500/20 dark:to-emerald-600/10 dark:border-emerald-500/20",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  red: {
    bg: "from-red-100/80 to-red-50/40 border-red-200 dark:from-red-500/20 dark:to-red-600/10 dark:border-red-500/20",
    icon: "text-red-600 dark:text-red-400",
  },
  amber: {
    bg: "from-amber-100/80 to-amber-50/40 border-amber-200 dark:from-amber-500/20 dark:to-amber-600/10 dark:border-amber-500/20",
    icon: "text-amber-600 dark:text-amber-400",
  },
} as const;

function KPICard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: keyof typeof KPI_STYLES;
}) {
  const styles = KPI_STYLES[color];
  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-5 ${styles.bg}`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${styles.icon}`} />
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
      </div>
      <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}

export default function OverviewContent() {
  const [metrics, setMetrics] = useState<QualityMetrics | null>(null);
  const [trend, setTrend] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [metricsRes, trendRes] = await Promise.all([
        fetchJson<QualityMetrics>("/api/quality-metrics"),
        fetchJson<{ trend: TrendPoint[] }>("/api/quality-metrics/trend?limit=30"),
      ]);
      if (cancelled) return;
      setMetrics(metricsRes);
      setTrend(trendRes?.trend ?? []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="text-sm text-slate-500">Loading...</div>;
  }

  if (!metrics) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-white/10 dark:bg-white/[0.02]">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">No automated runs yet</h1>
        <p className="mt-2 text-sm text-slate-500">
          This dashboard reflects real results from our own QA suite - check back after the next
          scheduled run.
        </p>
      </div>
    );
  }

  const isLive = metrics.source === "automation";
  const lastUpdated = metrics.lastUpdated ? new Date(metrics.lastUpdated) : null;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Overview</h1>
          <p className="mt-1 text-sm text-slate-500">
            Live test results for qasolucity.com, reported by our own automated QA suite.
          </p>
        </div>
        <div
          className={`flex items-center gap-2 rounded-full px-3 py-1.5 ${
            isLive ? "bg-emerald-100 dark:bg-emerald-500/20" : "bg-slate-100 dark:bg-slate-500/20"
          }`}
        >
          <span className="relative flex h-2 w-2">
            {isLive && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${isLive ? "bg-emerald-500 dark:bg-emerald-400" : "bg-slate-400"}`}
            />
          </span>
          <span
            className={`text-xs font-medium ${isLive ? "text-emerald-700 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"}`}
          >
            {isLive ? "Live" : "Baseline"}
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <KPICard icon={Activity} label="Pass Rate" value={`${metrics.passRate}%`} color="indigo" />
        <KPICard
          icon={CheckCircle2}
          label="Passed"
          value={`${metrics.passedTests}/${metrics.totalTests}`}
          color="emerald"
        />
        <KPICard icon={Bug} label="Bugs" value={metrics.bugs} color="red" />
        <KPICard icon={Zap} label="Test Coverage" value={`${metrics.coverage}%`} color="amber" />
        <KPICard
          icon={Activity}
          label="Site Health"
          value={metrics.apiHealth}
          color={metrics.apiHealth === "Healthy" ? "emerald" : "red"}
        />
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Pass rate trend</h2>
          <span className="text-xs text-slate-500">Last {trend.length} run{trend.length === 1 ? "" : "s"}</span>
        </div>
        <div className="mt-4">
          <TrendChart points={trend} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm dark:border-white/10 dark:bg-white/[0.02]">
        <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          Last updated:{" "}
          <span className="text-slate-700 dark:text-slate-300">
            {lastUpdated ? lastUpdated.toLocaleString() : "Never"}
          </span>
        </span>
        <Link
          href="/dashboard/executions"
          className="group flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          View execution history
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
