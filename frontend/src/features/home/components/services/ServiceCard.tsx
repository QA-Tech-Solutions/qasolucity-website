import { ArrowUpRight, LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
}: Props) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-gradient-to-b
        from-white
        to-slate-50/40
        p-10
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-indigo-200
        hover:shadow-2xl
        hover:shadow-indigo-500/10
      "
    >
      {/* Top Accent */}
      {/* <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" /> */}

      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Decorative Blur */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/10" />

      <div className="relative z-10">
        {/* Icon */}
        <div
          className="
            mb-8
            inline-flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-indigo-500
            to-violet-600
            shadow-lg
            shadow-indigo-500/20
            transition-transform
            duration-300
            group-hover:-translate-y-1
            group-hover:scale-105
          "
        >
          <Icon className="h-8 w-8 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-[22px] font-semibold leading-snug tracking-tight text-slate-900">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-5 text-[15px] leading-7 text-slate-600">
          {description}
        </p>

        {/* Arrow */}
        <div className="mt-8 flex justify-end">
          <ArrowUpRight
            className="
              h-5
              w-5
              text-indigo-500
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </div>
      </div>
    </article>
  );
}