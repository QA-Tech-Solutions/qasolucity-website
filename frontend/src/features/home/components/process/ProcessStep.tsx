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
    <div className="group relative flex flex-col items-center rounded-3xl border border-slate-200/50 bg-white/80 dark:bg-slate-900/80 p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-sm transition-all duration-500 hover:-translate-y-4 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-2xl hover:shadow-indigo-100/50">
      {/* Large Background Number */}
      <span className="absolute -top-4 right-4 text-8xl font-black leading-none text-slate-100/80 select-none transition-all duration-500 group-hover:text-indigo-100/50">
        {number}
      </span>

      {/* Icon Container */}
      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 shadow-inner transition-all duration-500 group-hover:from-indigo-500 group-hover:to-violet-500 group-hover:shadow-lg group-hover:shadow-indigo-500/20">
        <Icon className="h-9 w-9 text-indigo-600 dark:text-indigo-400 transition-all duration-500 group-hover:scale-110 group-hover:text-white" />
      </div>

      {/* Content */}
      <h3 className="relative z-10 mt-6 text-xl font-bold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
        {title}
      </h3>
      <p className="relative z-10 mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}