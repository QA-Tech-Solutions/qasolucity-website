interface Props {
  index: number;
  title: string;
  description: string;
}

export default function Principle({
  index,
  title,
  description,
}: Props) {
  return (
    <div className="group border-b border-slate-200 py-14 transition-all duration-300 hover:border-indigo-200">

      <div className="grid gap-10 lg:grid-cols-[120px_1fr_1.3fr]">

        <span className="text-6xl font-black text-slate-100 transition-colors duration-300 group-hover:text-indigo-100">
          {(index + 1).toString().padStart(2, "0")}
        </span>

        <h3 className="text-3xl font-bold leading-tight text-slate-900">
          {title}
        </h3>

        <p className="text-lg leading-9 text-slate-600">
          {description}
        </p>

      </div>

    </div>
  );
}