import { benefits } from "./data";
import BenefitItem from "./BenefitItem";

export default function BenefitsBar() {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-slate-200
        bg-white
        px-12
        py-10
        shadow-sm
      "
    >
      <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-indigo-100/30 blur-3xl" />

      <div className="relative flex flex-wrap items-center justify-between gap-12">
        <h3 className="max-w-[260px] text-4xl font-bold leading-tight text-slate-900">
          Elevate with QA Solucity
        </h3>

        <div className="flex flex-wrap items-center gap-14">
          {benefits.map((item) => (
            <BenefitItem
              key={item.title}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}