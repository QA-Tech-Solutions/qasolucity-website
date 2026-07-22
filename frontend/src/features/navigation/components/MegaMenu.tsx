import MegaMenuSection from "./MegaMenuSection";
import FeaturedCard from "./FeaturedCard";
import { NavigationSection } from "../types/navigation";

interface MegaMenuProps {
  sections: NavigationSection[];
}

export default function MegaMenu({
  sections,
}: MegaMenuProps) {
  return (
    <div className="absolute left-0 top-full pt-6">
      <div className="w-[920px] rounded-3xl border border-border bg-background p-8 shadow-2xl">
        <div className="grid grid-cols-4 gap-8">
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