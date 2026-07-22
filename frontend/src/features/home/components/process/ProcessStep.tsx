import { LucideIcon } from "lucide-react";

interface Props {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function ProcessStep({
  number,
  title,
  description,
  icon: Icon,
}: Props) {
  return (
    <div className="relative flex flex-col">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
        <Icon className="h-7 w-7 text-indigo-600" />
      </div>

      <span className="absolute -right-4 top-0 text-7xl font-bold text-slate-100">
        {number}
      </span>

      <h3 className="mt-2 text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-slate-500">
        {description}
      </p>
    </div>
  );
}