const metrics = [
  "Free Initial Consultation",
  "Enterprise Ready",
  "Remote & On-site Support",
];

export default function CTAMetrics() {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-4">

      {metrics.map((metric) => (
        <span
          key={metric}
          className="
            rounded-full
            border
            border-white/15
            bg-white/10
            px-5
            py-3
            text-sm
            font-medium
            backdrop-blur
          "
        >
          {metric}
        </span>
      ))}

    </div>
  );
}