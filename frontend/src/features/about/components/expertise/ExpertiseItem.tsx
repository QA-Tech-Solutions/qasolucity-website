import { ArrowUpRight, LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ExpertiseItem({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <article className="group border-b border-slate-200 py-12 transition-all duration-300 hover:border-indigo-200">

      <div className="grid gap-8 lg:grid-cols-[90px_280px_1fr_auto]">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-300 group-hover:bg-indigo-50">
          <Icon className="h-7 w-7 text-indigo-600" />
        </div>

        <h3 className="text-3xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="max-w-3xl text-lg leading-9 text-slate-600">
          {description}
        </p>

        <ArrowUpRight className="mt-2 h-6 w-6 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-indigo-600" />

      </div>

    </article>
  );
}