const steps = [
  "Discover",
  "Quality",
  "Automation",
  "Innovation",
];

export default function StoryTimeline() {
  return (
    <div className="space-y-10">

      {steps.map((step, index) => (
        <div
          key={step}
          className="relative flex items-center gap-6"
        >
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">

            {index + 1}

          </div>

          <h3 className="text-xl font-semibold text-slate-800">
            {step}
          </h3>

          {index !== steps.length - 1 && (
            <div className="absolute left-6 top-12 h-12 w-px bg-slate-200" />
          )}
        </div>
      ))}

    </div>
  );
}