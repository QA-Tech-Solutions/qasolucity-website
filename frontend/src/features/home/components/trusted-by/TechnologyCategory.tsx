import TechnologyPill from "./TechnologyPill";

interface Props {
  title: string;
  technologies: {
    name: string;
    logo: string;
  }[];
  last?: boolean;
}

export default function TechnologyCategory({
  title,
  technologies,
  last,
}: Props) {
  return (
    <div
      className={`
        grid
        gap-6
        px-10
        py-8
        lg:grid-cols-[170px_minmax(0,1fr)]
        ${!last ? "border-b border-slate-100 dark:border-slate-800" : ""}
      `}
    >
      <h3
        className="
          text-sm
          font-bold
          uppercase
          tracking-[0.22em]
          text-slate-500 dark:text-slate-400
        "
      >
        {title}
      </h3>

      <div className="flex flex-wrap gap-4">
        {technologies.map((technology) => (
          <TechnologyPill
            key={technology.name}
            name={technology.name}
            logo={technology.logo}
          />
        ))}
      </div>
    </div>
  );
}