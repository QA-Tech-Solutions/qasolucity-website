const metrics = [
  {
    value: "100+",
    label: "Projects Tested",
  },
  {
    value: "99%",
    label: "Client Satisfaction",
  },
  {
    value: "24/7",
    label: "QA Support",
  },
];

export default function CTAMetrics() {
  return (
    <div className="space-y-5">

      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="
            rounded-[28px]
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur
          "
        >
          <h3 className="text-5xl font-bold text-white">
            {metric.value}
          </h3>

          <p className="mt-3 text-slate-300">
            {metric.label}
          </p>
        </div>
      ))}

    </div>
  );
}