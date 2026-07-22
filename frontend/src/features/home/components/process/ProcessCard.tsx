import { LucideIcon } from "lucide-react";

interface Props {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export default function ProcessCard({
  id,
  title,
  description,
  icon: Icon,
  className,
}: Props) {
  return (
    <div
      className={`absolute w-[320px] rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
        <Icon className="h-7 w-7 text-indigo-600" />
      </div>

      <span className="mt-6 inline-block rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
        {id}
      </span>

      <h3 className="mt-5 text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-500">
        {description}
      </p>
    </div>
  );
}