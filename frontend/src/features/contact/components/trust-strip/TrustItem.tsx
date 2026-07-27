import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function TrustItem({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <div className="flex items-start gap-5">

      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>

      <div>

        <h3 className="text-lg font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 leading-7 text-slate-600">
          {description}
        </p>

      </div>

    </div>
  );
}