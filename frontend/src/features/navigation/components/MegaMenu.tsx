import MegaMenuSection from "./MegaMenuSection";
import FeaturedCard from "./FeaturedCard";
import { NavigationSection } from "../types/navigation";

interface MegaMenuProps {
  sections: NavigationSection[];
}

export default function MegaMenu({ sections }: MegaMenuProps) {
  const width =
    sections.length === 1
      ? "760px"
      : sections.length === 2
      ? "1000px"
      : "1100px";

  return (
    <div className="w-[100vw] flex justify-center pt-4">
      <div
        className="rounded-[28px] border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-7 shadow-[0_35px_90px_rgba(15,23,42,.15)] dark:shadow-[0_35px_90px_rgba(0,0,0,.4)] backdrop-blur-xl"
        style={{ width }}
      >
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${sections.length}, minmax(230px,1fr)) 280px`,
          }}
        >
          {sections.map((section) => (
            <MegaMenuSection key={section.title} section={section} />
          ))}

          <FeaturedCard />
        </div>
      </div>
    </div>
  );
}