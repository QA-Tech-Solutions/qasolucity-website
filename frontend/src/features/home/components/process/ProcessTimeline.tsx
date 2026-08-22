import { Search, FlaskConical, ShieldCheck } from "lucide-react";
import ProcessStep from "./ProcessStep";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Planning",
    description:
      "We understand your product, users, risks and quality goals before writing a single test.",
  },
  {
    number: "02",
    icon: FlaskConical,
    title: "Test Execution",
    description:
      "Manual, automation, API and performance testing executed with detailed reporting.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Continuous Quality",
    description:
      "Regression testing, release validation and continuous QA support as your product evolves.",
  },
];

export default function ProcessTimeline() {
  return (
    <div className="relative mt-20">
      {/* Animated Connecting Line (Desktop) */}
      <div className="absolute left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] top-1/2 hidden h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 md:block">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_infinite] bg-gradient-to-r from-transparent via-indigo-500 to-violet-500"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <ProcessStep key={step.number} {...step} />
        ))}
      </div>
    </div>
  );
}