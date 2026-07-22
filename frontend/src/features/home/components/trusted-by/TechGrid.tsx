import TechCard from "./TechCard";
import { technologies } from "./data";

export default function TechGrid() {
  return (
    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {technologies.map((technology) => (
        <TechCard
          key={technology.name}
          {...technology}
        />
      ))}
    </div>
  );
}