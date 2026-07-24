import MegaMenuSection from "./MegaMenuSection";
import FeaturedCard from "./FeaturedCard";
import { NavigationSection } from "../types/navigation";

interface MegaMenuProps {
  sections: NavigationSection[];
}

export default function MegaMenu({
  sections,
}: MegaMenuProps) {

  const width =
    sections.length === 1
      ? "760px"
      : sections.length === 2
      ? "900px"
      : "1100px";

  return (
    <div className="w-[100vw] flex justify-center pt-6">
      <div
        className="rounded-[32px] border border-slate-200 bg-white/95 p-10 shadow-[0_35px_90px_rgba(15,23,42,.15)] backdrop-blur-xl"
        style={{ width }}
      >
        <div
          className="grid gap-10"
          style={{
            gridTemplateColumns: `repeat(${sections.length}, minmax(180px,1fr)) 320px`,
          }}
        >
          {sections.map((section) => (
            <MegaMenuSection
              key={section.title}
              section={section}
            />
          ))}

          <FeaturedCard />
        </div>
      </div>
    </div>
  );
}