"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Smartphone, Monitor } from "lucide-react";
import type { QualityRunSummary } from "@/lib/quality-metrics-store";
import { type TestAggregate } from "@/lib/quality-metrics-analysis";

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

/** Same minimal line-chart approach as OverviewContent's TrendChart, plotting duration instead of pass rate. */
function DurationChart({ runs }: { runs: QualityRunSummary[] }) {
  const points = runs.filter((r) => typeof r.totalDurationMs === "number").reverse();
  if (points.length < 2) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500 dark:border-white/10">
        Not enough runs with duration data yet.
      </div>
    );
  }

  const width = 800;
  const height = 128;
  const seconds = points.map((p) => (p.totalDurationMs ?? 0) / 1000);
  const minVal = Math.min(...seconds);
  const maxVal = Math.max(...seconds);
  const range = Math.max(maxVal - minVal, 1);

  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * width,
    y: height - (((p.totalDurationMs ?? 0) / 1000 - minVal) / range) * height,
  }));
  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");

  return (
    <div className="h-32 w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none">
        <path d={linePath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{formatDate(points[0].timestamp)}</span>
        <span>{formatDate(points[points.length - 1].timestamp)}</span>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.02]">
      <h2 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

/**
 * Stacked bar chart, one bar per run: passed count in emerald, failed
 * count in rose, stacked to the run's total test count - "run trend of
 * the month" at a glance, and an oscillating pattern here is exactly what
 * flaky-test churn looks like, which a flat "slowest tests" list never
 * showed. Same minimal inline-SVG approach as DurationChart/PassRateTrendChart,
 * no charting library.
 */
function RunTrendChart({ runs }: { runs: QualityRunSummary[] }) {
  const points = runs.slice().reverse();
  if (points.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500 dark:border-white/10">
        No runs recorded yet.
      </div>
    );
  }

  const height = 140;
  const maxTotal = Math.max(...points.map((p) => p.totalTests), 1);
  const barWidth = Math.min(28, 640 / points.length - 4);
  const gap = 4;
  const width = points.length * (barWidth + gap);

  return (
    <div>
      <div className="flex items-end gap-1 overflow-x-auto pb-1" style={{ height }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className="shrink-0"
          preserveAspectRatio="none"
          role="img"
          aria-label="Passed and failed test counts for each of the last runs"
        >
          {points.map((run, i) => {
            const x = i * (barWidth + gap);
            const failed = Math.max(run.totalTests - run.passedTests, 0);
            const passedHeight = (run.passedTests / maxTotal) * height;
            const failedHeight = (failed / maxTotal) * height;
            return (
              <g key={run.id}>
                <rect
                  x={x}
                  y={height - passedHeight - failedHeight}
                  width={barWidth}
                  height={passedHeight}
                  fill="#10b981"
                  rx={2}
                >
                  <title>{`${formatDate(run.timestamp)}: ${run.passedTests} passed`}</title>
                </rect>
                {failed > 0 && (
                  <rect
                    x={x}
                    y={height - failedHeight}
                    width={barWidth}
                    height={failedHeight}
                    fill="#f43f5e"
                    rx={2}
                  >
                    <title>{`${formatDate(run.timestamp)}: ${failed} failed`}</title>
                  </rect>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
        <span>{formatDate(points[0].timestamp)}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Passed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" /> Failed
          </span>
        </div>
        <span>{formatDate(points[points.length - 1].timestamp)}</span>
      </div>
    </div>
  );
}

/**
 * Pass rate over time as a filled area chart - the single most useful
 * automation metric to trend (a number alone hides whether it's climbing
 * or sliding), so this gets first billing over the raw duration chart's
 * neighbors.
 */
function PassRateTrendChart({ runs }: { runs: QualityRunSummary[] }) {
  const points = runs.slice().reverse();
  if (points.length < 2) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500 dark:border-white/10">
        Not enough runs yet to show a trend.
      </div>
    );
  }

  const width = 800;
  const height = 128;
  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * width,
    y: height - (Math.max(0, Math.min(100, p.passRate)) / 100) * height,
  }));
  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L${width} ${height} L0 ${height} Z`;
  const latest = points[points.length - 1].passRate;

  return (
    <div className="h-32 w-full">
      <div className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">{latest}%</div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-24 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="passRateFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#passRateFill)" stroke="none" />
        <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{formatDate(points[0].timestamp)}</span>
        <span>{formatDate(points[points.length - 1].timestamp)}</span>
      </div>
    </div>
  );
}

export default function AnalyticsContent() {
  const [runs, setRuns] = useState<QualityRunSummary[] | null>(null);
  const [tests, setTests] = useState<TestAggregate[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [runsRes, testsRes] = await Promise.all([
        fetchJson<{ runs: QualityRunSummary[] }>("/api/quality-metrics/runs?limit=30"),
        fetchJson<{ tests: TestAggregate[] }>("/api/quality-metrics/tests?window=20"),
      ]);
      if (cancelled) return;
      setRuns(runsRes?.runs ?? []);
      setTests(testsRes?.tests ?? []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const byProject = useMemo(() => {
    const totals = {
      desktop: { pass: 0, total: 0 },
      mobile: { pass: 0, total: 0 },
    };
    for (const t of tests ?? []) {
      const bucket = totals[t.project];
      bucket.pass += t.passCount;
      bucket.total += t.passCount + t.failCount;
    }
    return totals;
  }, [tests]);

  if (runs === null || tests === null) {
    return <p className="text-sm text-slate-500">Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Analytics</h1>
      <p className="mt-1 text-sm text-slate-500">
        Trends and outliers across the last {tests.length > 0 ? "20 runs" : "run"} of recorded history.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card title="Pass rate trend">
          <PassRateTrendChart runs={runs} />
        </Card>

        <Card title="Run trend (last 30 days)">
          <RunTrendChart runs={runs} />
        </Card>

        <Card title="Run duration trend">
          <DurationChart runs={runs} />
        </Card>

        <Card title="Desktop vs. mobile pass rate">
          <div className="space-y-4">
            {(["desktop", "mobile"] as const).map((project) => {
              const { pass, total } = byProject[project];
              const rate = total > 0 ? Math.round((pass / total) * 100) : null;
              const Icon = project === "desktop" ? Monitor : Smartphone;
              return (
                <div key={project}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 capitalize text-slate-700 dark:text-slate-300">
                      <Icon className="h-4 w-4 text-slate-400" />
                      {project}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {rate === null ? "No data" : `${rate}%`}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-indigo-500"
                      style={{ width: `${rate ?? 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="h-3 w-3" />
        Pass rate/run trend/duration use the last 30 reported runs; the project split uses the last 20.
      </p>
    </div>
  );
}
