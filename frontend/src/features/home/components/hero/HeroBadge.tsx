import { Badge } from "@/components/ui/Badge";
import { ShieldCheck } from "lucide-react";

export default function HeroBadge() {
  return (
    <Badge className="group inline-flex items-center gap-3 rounded-full border-0 bg-gradient-to-r from-indigo-50/90 to-violet-50/90 px-5 py-2.5 shadow-lg shadow-indigo-100/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-indigo-200/60">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md">
        <ShieldCheck className="h-4 w-4" />
      </span>
      <span className="font-semibold text-slate-800">
        Built for teams that care about quality
      </span>
      {/* Optional: subtle decorative dot */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
      </span>
    </Badge>
  );
}