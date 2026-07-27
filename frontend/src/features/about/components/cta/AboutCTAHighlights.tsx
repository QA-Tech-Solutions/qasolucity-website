const highlights = [
  "Quality Engineering",
  "Automation First",
  "Enterprise Ready",
  "Trusted Partnership",
];

export default function AboutCTAHighlights() {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-4">

      {highlights.map((item) => (
        <span
          key={item}
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
          {item}
        </span>
      ))}

    </div>
  );
}