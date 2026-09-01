"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, AlertTriangle, Smartphone, Monitor } from "lucide-react";
import type { QualityRunSummary } from "@/lib/quality-metrics-store";
import { flakinessRatio, type TestAggregate } from "@/lib/quality-metrics-analysis";

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

function RankedTestRow({ test, metric }: { test: TestAggregate; metric: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-2.5 text-sm last:border-0 dark:border-white/5">
      <div className="min-w-0">
        <p className="truncate text-slate-700 dark:text-slate-200">{test.title}</p>
        <p className="truncate font-mono text-xs text-slate-500">{test.file}</p>
      </div>
      <span className="shrink-0 font-medium text-slate-500 dark:text-slate-400">{metric}</span>
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

  const slowest = useMemo(
    () => (tests ?? []).slice().sort((a, b) => b.avgDurationMs - a.avgDurationMs).slice(0, 8),
    [tests]
  );

  const flakiest = useMemo(
    () =>
      (tests ?? [])
        .filter((t) => t.passCount > 0 && t.failCount > 0)
        .sort((a, b) => flakinessRatio(b) - flakinessRatio(a))
        .slice(0, 8),
    [tests]
  );

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

        <Card title="Slowest tests">
          {slowest.length === 0 ? (
            <p className="text-sm text-slate-500">No data yet.</p>
          ) : (
            <div>
              {slowest.map((t) => (
                <RankedTestRow key={t.key} test={t} metric={`${(t.avgDurationMs / 1000).toFixed(1)}s avg`} />
              ))}
            </div>
          )}
        </Card>

        <Card title="Flakiest tests">
          {flakiest.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400">
              <AlertTriangle className="h-4 w-4" />
              No flaky tests detected in this window.
            </div>
          ) : (
            <div>
              {flakiest.map((t) => (
                <RankedTestRow key={t.key} test={t} metric={`fails ${Math.round(flakinessRatio(t) * 100)}%`} />
              ))}
            </div>
          )}
        </Card>
      </div>

      <p className="mt-6 flex items-center gap-1.5 text-xs text-slate-500">
        <Clock className="h-3 w-3" />
        Slowest/flakiest/project split are computed from the last 20 reported runs; the duration trend uses the last 30.
      </p>
    </div>
  );
}
