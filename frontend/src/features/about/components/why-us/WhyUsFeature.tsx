import { ArrowUpRight, LucideIcon } from "lucide-react";

interface Props {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function WhyUsFeature({
  number,
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <div className="group flex flex-col gap-8 border-b border-slate-200 py-12 transition-all duration-300 hover:border-indigo-200">

      <div className="flex items-start justify-between">

        <span className="text-6xl font-black text-slate-100 transition-colors group-hover:text-indigo-100">
          {number}
        </span>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-300 group-hover:bg-indigo-50">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

        <h3 className="text-3xl font-bold text-slate-900">
          {title}
        </h3>

        <div className="flex items-start justify-between gap-8">

          <p className="max-w-2xl text-lg leading-9 text-slate-600">
            {description}
          </p>

          <ArrowUpRight className="mt-1 h-6 w-6 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-indigo-600" />

        </div>

      </div>

    </div>
  );
}