"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import { flakinessRatio, type TestAggregate } from "@/lib/quality-metrics-analysis";

function statusOf(test: TestAggregate): "passing" | "failing" | "flaky" {
  if (test.passCount > 0 && test.failCount > 0) return "flaky";
  if (test.currentStatus === "failed") return "failing";
  return "passing";
}

const STATUS_ICON = { passing: CheckCircle2, failing: XCircle, flaky: AlertTriangle } as const;
const STATUS_COLOR = {
  passing: "text-emerald-600 dark:text-emerald-400",
  failing: "text-red-600 dark:text-red-400",
  flaky: "text-amber-600 dark:text-amber-400",
} as const;

export default function AdminTestsList() {
  const [tests, setTests] = useState<TestAggregate[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/quality-metrics/admin-tests?window=20", { cache: "no-store" });
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

  const sorted = useMemo(
    () => (tests ?? []).slice().sort((a, b) => a.title.localeCompare(b.title)),
    [tests]
  );

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <ShieldAlert className="h-5 w-5 text-indigo-500" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">Admin</h1>
      </div>
      <p className="mt-1 text-sm text-slate-500">
        Results for admin.spec.ts - the suite covering /admin/assign-voucher and /admin/voucher-log,
        held back from the public dashboard since it&apos;s the one part of the site that touches
        real customer vouchers.
      </p>

      {tests === null ? (
        <p className="mt-8 text-sm text-slate-500">Loading...</p>
      ) : sorted.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center dark:border-white/10 dark:bg-white/[0.02]">
          <p className="text-sm text-slate-500">No admin.spec.ts results reported yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {sorted.map((test) => {
            const status = statusOf(test);
            const Icon = STATUS_ICON[status];
            return (
              <div
                key={test.key}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.02]"
              >
                <div className="flex items-start gap-3">
                  <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${STATUS_COLOR[status]}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{test.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-white/10">
                        {test.project}
                      </span>
                      <span>
                        {test.passCount}/{test.runsSeen} runs passed
                      </span>
                      <span>{(test.avgDurationMs / 1000).toFixed(1)}s avg</span>
                      {status === "flaky" && (
                        <span className="font-medium text-amber-600 dark:text-amber-400">
                          fails {Math.round(flakinessRatio(test) * 100)}% of runs
                        </span>
                      )}
                    </div>
                    {test.lastError && (
                      <pre className="mt-2 overflow-x-auto rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-500/10 dark:text-red-300">
                        {test.lastError}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
