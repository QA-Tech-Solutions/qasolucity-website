import { technologyStack } from "./data";
import TechnologyCategory from "./TechnologyCategory";
import { Cpu, Shield, RefreshCw } from "lucide-react";

export default function TechnologyStack() {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
      {technologyStack.map((category, index) => (
        <TechnologyCategory
          key={category.title}
          title={category.title}
          technologies={category.technologies}
          last={index === technologyStack.length - 1}
        />
      ))}

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-10 py-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 ring-1 ring-indigo-200/50 transition hover:bg-indigo-100">
          <Cpu className="h-4 w-4" />
          20+ Technologies
        </span>
      
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200/50 transition hover:bg-emerald-100">
          <Shield className="h-4 w-4" />
          Enterprise Ready
        </span>
      
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 ring-1 ring-amber-200/50 transition hover:bg-amber-100">
          <RefreshCw className="h-4 w-4" />
          Constantly Updated
        </span>
      </div>
    </div>
  );
}