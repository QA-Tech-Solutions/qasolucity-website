import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function WhyContactCard({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
        <Icon className="h-7 w-7 text-indigo-600" />
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-slate-600">
        {description}
      </p>

    </div>
  );
}