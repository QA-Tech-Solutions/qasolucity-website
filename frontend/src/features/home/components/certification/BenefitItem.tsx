import {
  Award,
  Lightbulb,
  Star,
} from "lucide-react";

interface Props {
  title: string;
  icon: string;
}

const icons = {
  star: Star,
  award: Award,
  sparkles: Lightbulb,
};

export default function BenefitItem({
  title,
  icon,
}: Props) {
  const Icon = icons[icon as keyof typeof icons];

  return (
    <div className="group flex items-center gap-4 transition-all duration-300 hover:-translate-y-1">
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-indigo-50
          to-white
          shadow-md
          ring-1
          ring-slate-100
          transition-all
          duration-300
          group-hover:shadow-lg
        "
      >
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>

      <span className="max-w-[140px] text-[15px] font-medium leading-6 text-slate-700">
        {title}
      </span>
    </div>
  );
}