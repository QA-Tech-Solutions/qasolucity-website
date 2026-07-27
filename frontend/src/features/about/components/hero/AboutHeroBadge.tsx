import { Sparkles } from "lucide-react";

export default function AboutHeroBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-indigo-100 bg-white px-5 py-3 shadow-sm">

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">

        <Sparkles className="h-4 w-4 text-indigo-600" />

      </div>

      <span className="text-sm font-semibold tracking-wide text-slate-700">
        About QA Solucity
      </span>

    </div>
  );
}