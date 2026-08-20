"use client";

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function AboutHeroBadge() {
  return (
    <Badge className="group inline-flex items-center gap-3 rounded-full border-0 bg-white/80 px-5 py-2.5 shadow-sm shadow-indigo-100/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-indigo-200/60">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md">
        <Sparkles className="h-4 w-4" />
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
        About QA Solucity
      </span>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
    </Badge>
  );
}