import { ShieldCheck } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="border-b border-slate-100 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            QA Command Center
          </h2>

          <p className="text-sm text-slate-500">
            Release Readiness Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}