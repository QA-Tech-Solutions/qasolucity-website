"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, MinusCircle, Film, ExternalLink } from "lucide-react";
import type { QualityRun, TestResult } from "@/lib/quality-metrics-store";

/** Playwright's own hosted trace viewer - loads and renders any public trace.zip URL client-side, no server round-trip. */
function traceViewerUrl(traceUrl: string): string {
  return `https://trace.playwright.dev/?trace=${encodeURIComponent(traceUrl)}`;
}

type StatusFilter = "all" | "failed" | "passed" | "skipped";

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const STATUS_ICON: Record<TestResult["status"], typeof CheckCircle2> = {
  passed: CheckCircle2,
  failed: XCircle,
  skipped: MinusCircle,
};

const STATUS_COLOR: Record<TestResult["status"], string> = {
  passed: "text-emerald-600 dark:text-emerald-400",
  failed: "text-red-600 dark:text-red-400",
  skipped: "text-slate-500",
};

function TestRow({ test }: { test: TestResult }) {
  const Icon = STATUS_ICON[test.status];
  const [traceOpen, setTraceOpen] = useState(false);
  const hasArtifacts = test.screenshotUrl || test.videoUrl || test.traceUrl;

  return (
    <div className="border-b border-slate-100 px-5 py-3.5 last:border-0 dark:border-white/5">
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${STATUS_COLOR[test.status]}`} />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-700 dark:text-slate-200">{test.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-white/10">
              {test.project}
            </span>
            <span>{(test.durationMs / 1000).toFixed(1)}s</span>
          </div>
          {test.error && (
            <pre className="mt-2 overflow-x-auto rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300">
              {test.error}
            </pre>
          )}

          {hasArtifacts && (
            <div className="mt-3 space-y-3">
              <div className="flex flex-wrap gap-3">
                {test.screenshotUrl && (
                  <a href={test.screenshotUrl} target="_blank" rel="noopener noreferrer" className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element -- external Blob URL, not a site asset Next's image pipeline can optimize */}
                    <img
                      src={test.screenshotUrl}
                      alt={`Screenshot: ${test.title}`}
                      className="h-24 w-auto rounded-lg border border-slate-200 object-cover transition-opacity hover:opacity-80 dark:border-white/10"
                    />
                  </a>
                )}
                {test.videoUrl && (
                  <video
                    src={test.videoUrl}
                    controls
                    className="h-24 w-auto rounded-lg border border-slate-200 dark:border-white/10"
                  />
                )}
              </div>

              {test.traceUrl && (
                <div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTraceOpen((open) => !open)}
                      className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <Film className="h-3.5 w-3.5" />
                      {traceOpen ? "Hide trace" : "View full trace"}
                    </button>
                    <a
                      href={traceViewerUrl(test.traceUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      Open in new tab
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  {traceOpen && (
                    <iframe
                      src={traceViewerUrl(test.traceUrl)}
                      title={`Trace viewer: ${test.title}`}
                      className="mt-2 h-[600px] w-full rounded-lg border border-slate-200 dark:border-white/10"
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RunDetail({ id }: { id: string }) {
  const [run, setRun] = useState<QualityRun | null | undefined>(undefined);
  const [filter, setFilter] = useState<StatusFilter>("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/quality-metrics/runs/${id}`, { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) setRun(null);
          return;
        }
        const data = (await res.json()) as { run: QualityRun };
        if (!cancelled) setRun(data.run);
      } catch {
        if (!cancelled) setRun(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const grouped = useMemo(() => {
    if (!run) return [];
    const filtered = run.tests.filter((t) => filter === "all" || t.status === filter);
    const byFile = new Map<string, TestResult[]>();
    for (const test of filtered) {
      byFile.set(test.file, [...(byFile.get(test.file) ?? []), test]);
    }
    return [...byFile.entries()];
  }, [run, filter]);

  const counts = useMemo(() => {
    if (!run) return { all: 0, passed: 0, failed: 0, skipped: 0 };
    return run.tests.reduce(
      (acc, t) => {
        acc.all += 1;
        acc[t.status] += 1;
        return acc;
      },
      { all: 0, passed: 0, failed: 0, skipped: 0 }
    );
  }, [run]);

  return (
    <div>
      <Link
        href="/dashboard/executions"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to executions
      </Link>

      {run === undefined ? (
        <p className="mt-8 text-sm text-slate-500">Loading...</p>
      ) : run === null ? (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-white/10 dark:bg-white/[0.02]">
          <p className="text-sm text-slate-500">This run couldn&apos;t be found.</p>
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {formatTimestamp(run.timestamp)}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {run.passedTests}/{run.totalTests} passed &middot; {run.passRate}% pass rate
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                run.apiHealth === "Healthy"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                  : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
              }`}
            >
              {run.apiHealth}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(["all", "failed", "passed", "skipped"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium capitalize transition-colors duration-200 ${
                  filter === key
                    ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/[0.03] dark:text-slate-400 dark:hover:bg-white/[0.06]"
                }`}
              >
                {key} ({counts[key]})
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {grouped.length === 0 ? (
              <p className="text-sm text-slate-500">No tests match this filter.</p>
            ) : (
              grouped.map(([file, tests]) => (
                <div key={file} className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                  <div className="border-b border-slate-200 bg-slate-50 px-5 py-2.5 font-mono text-xs text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
                    {file}
                  </div>
                  {tests.map((test, i) => (
                    <TestRow key={`${test.title}-${test.project}-${i}`} test={test} />
                  ))}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
