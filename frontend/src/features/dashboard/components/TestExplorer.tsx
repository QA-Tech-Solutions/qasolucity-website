"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, CheckCircle2, XCircle, MinusCircle, AlertTriangle } from "lucide-react";
import type { TestAggregate } from "@/lib/quality-metrics-analysis";

type ExplorerFilter = "all" | "failing" | "flaky" | "passing";

function statusOf(test: TestAggregate): ExplorerFilter {
  if (test.passCount > 0 && test.failCount > 0) return "flaky";
  if (test.currentStatus === "failed") return "failing";
  return "passing";
}

const STATUS_ICON = {
  passing: CheckCircle2,
  failing: XCircle,
  flaky: AlertTriangle,
  all: MinusCircle,
} as const;

const STATUS_COLOR = {
  passing: "text-emerald-600 dark:text-emerald-400",
  failing: "text-red-600 dark:text-red-400",
  flaky: "text-amber-600 dark:text-amber-400",
  all: "text-slate-500",
} as const;

export default function TestExplorer() {
  const [tests, setTests] = useState<TestAggregate[] | null>(null);
  const [filter, setFilter] = useState<ExplorerFilter>("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/quality-metrics/tests?window=20", { cache: "no-store" });
        const data = res.ok ? ((await res.json()) as { tests: TestAggregate[] }) : { tests: [] };
        if (!cancelled) setTests(data.tests);
      } catch {
        if (!cancelled) setTests([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!tests) return [];
    const q = query.trim().toLowerCase();
    return tests
      .filter((t) => filter === "all" || statusOf(t) === filter)
      .filter((t) => !q || t.title.toLowerCase().includes(q) || t.file.toLowerCase().includes(q))
      .sort((a, b) => a.file.localeCompare(b.file) || a.title.localeCompare(b.title));
  }, [tests, filter, query]);

  const counts = useMemo(() => {
    if (!tests) return { all: 0, passing: 0, failing: 0, flaky: 0 };
    return tests.reduce(
      (acc, t) => {
        acc.all += 1;
        acc[statusOf(t)] += 1;
        return acc;
      },
      { all: 0, passing: 0, failing: 0, flaky: 0 }
    );
  }, [tests]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Test Explorer</h1>
      <p className="mt-1 text-sm text-slate-500">
        Every test the suite has reported in the last 20 runs, independent of any single execution.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "passing", "failing", "flaky"] as const).map((key) => (
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
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or file..."
            className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 sm:w-64"
          />
        </div>
      </div>

      {tests === null ? (
        <p className="mt-8 text-sm text-slate-500">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">No tests match.</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Test explorer table, scrollable">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-white/[0.02]">
                  <th className="px-5 py-3 font-medium">Test</th>
                  <th className="px-5 py-3 font-medium">Project</th>
                  <th className="px-5 py-3 font-medium">Reliability</th>
                  <th className="px-5 py-3 font-medium">Avg duration</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((test) => {
                  const status = statusOf(test);
                  const Icon = STATUS_ICON[status];
                  return (
                    <tr
                      key={test.key}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-start gap-2.5">
                          <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${STATUS_COLOR[status]}`} />
                          <div className="min-w-0">
                            <p className="text-slate-700 dark:text-slate-200">{test.title}</p>
                            <p className="mt-0.5 truncate font-mono text-xs text-slate-500">{test.file}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">{test.project}</td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                        {test.passCount}/{test.runsSeen} runs passed
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                        {(test.avgDurationMs / 1000).toFixed(1)}s
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
