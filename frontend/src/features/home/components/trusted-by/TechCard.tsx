import { ArrowUpRight } from "lucide-react";

interface TechCardProps {
  name: string;
  category: string;
  description: string;
}

export default function TechCard({
  name,
  category,
  description,
}: TechCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            {category}
          </p>

          <h3 className="mt-3 text-2xl font-bold text-slate-900">
            {name}
          </h3>
        </div>

        <ArrowUpRight className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-indigo-600" />
      </div>

      <p className="mt-6 leading-7 text-slate-600">
        {description}
      </p>
    </div>
  );
}