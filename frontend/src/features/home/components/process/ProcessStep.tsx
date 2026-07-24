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
    <div className="relative">
      <span
        className="
          absolute
          -left-6
          -top-10
          text-[130px]
          font-black
          leading-none
          text-slate-100/60
          select-none
        "
      >
        {number}
      </span>

      <div className="relative z-10">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <Icon className="h-7 w-7 text-indigo-600" />
        </div>

        <h3 className="mt-6 text-xl font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 max-w-xs leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}