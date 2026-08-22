import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Props {
  name: string;
  logo: string;
}

export default function TechnologyPill({
  name,
  logo,
}: Props) {
  return (
    <div
      className="
        group
        inline-flex
        max-w-fit
        shrink-0
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200 dark:border-slate-800
        bg-white dark:bg-slate-900
        px-5
        py-3
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-200 dark:hover:border-indigo-700
        hover:bg-indigo-50 dark:hover:bg-indigo-950/40
        hover:shadow-lg
        hover:shadow-indigo-100/40
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-slate-100 dark:bg-slate-800
          transition-colors
          group-hover:bg-white dark:group-hover:bg-slate-800
        "
      >
        <Image
          src={logo}
          alt={name}
          width={22}
          height={22}
          className="h-5 w-5 object-contain"
        />
      </div>

      <span className="font-semibold text-slate-700 dark:text-slate-300">
        {name}
      </span>

      <ArrowUpRight
        className="
          ml-1
          h-4
          w-4
          text-slate-400 dark:text-slate-500
          opacity-0
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:-translate-y-1
          group-hover:opacity-100
          group-hover:text-indigo-600 dark:group-hover:text-indigo-400
        "
      />
    </div>
  );
}