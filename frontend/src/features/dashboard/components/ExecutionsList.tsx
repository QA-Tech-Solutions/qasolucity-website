"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { QualityRunSummary } from "@/lib/quality-metrics-store";

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ExecutionsList() {
  const [runs, setRuns] = useState<QualityRunSummary[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/quality-metrics/runs?limit=30", { cache: "no-store" });
        const data = res.ok ? ((await res.json()) as { runs: QualityRunSummary[] }) : { runs: [] };
        if (!cancelled) setRuns(data.runs);
      } catch {
        if (!cancelled) setRuns([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Executions</h1>
      <p className="mt-1 text-sm text-slate-500">
        Every reported run of the automated suite, newest first.
      </p>

      {runs === null ? (
        <p className="mt-8 text-sm text-slate-500">Loading...</p>
      ) : runs.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-white/10 dark:bg-white/[0.02]">
          <p className="text-sm text-slate-500">
            No runs recorded yet. History starts accumulating from the next scheduled run onward.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Executions table, scrollable">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/[0.02]">
                  <th className="px-5 py-3 font-medium">Run</th>
                  <th className="px-5 py-3 font-medium">Pass rate</th>
                  <th className="px-5 py-3 font-medium">Passed</th>
                  <th className="px-5 py-3 font-medium">Bugs</th>
                  <th className="px-5 py-3 font-medium">Coverage</th>
                  <th className="px-5 py-3 font-medium">Health</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {runs.map((run) => (
                  <tr
                    key={run.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                      {formatTimestamp(run.timestamp)}
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                      {run.passRate}%
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                      {run.passedTests}/{run.totalTests}
                    </td>
                    <td
                      className={`px-5 py-3.5 ${run.bugs > 0 ? "text-red-600 dark:text-red-400" : "text-slate-500 dark:text-slate-400"}`}
                    >
                      {run.bugs}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{run.coverage}%</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          run.apiHealth === "Healthy"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                            : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                        }`}
                      >
                        {run.apiHealth}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/dashboard/executions/${run.id}`}
                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Details <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
