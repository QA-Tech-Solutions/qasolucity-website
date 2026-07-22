import { processSteps } from "./process";
import ProcessStep from "./ProcessStep";

export default function ProcessTimeline() {
  return (
    <div className="relative mt-24">
      {/* Line */}
      <div className="absolute left-0 right-0 top-8 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />

      <div className="grid gap-20 lg:grid-cols-3">
        {processSteps.map((step) => (
          <ProcessStep
            key={step.number}
            {...step}
          />
        ))}
      </div>
    </div>
  );
}