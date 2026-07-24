import Link from "next/link";
import { NavigationSection } from "../types/navigation";

interface MegaMenuSectionProps {
  section: NavigationSection;
}

export default function MegaMenuSection({
  section,
}: MegaMenuSectionProps) {
  return (
    <div>
      <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
        {section.title}
      </h4>

      <ul className="space-y-6 min-w-[220px]">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-xl px-3 py-2 whitespace-nowrap text-[17px] font-medium text-slate-600 transition-all duration-200 hover:translate-x-1 hover:bg-slate-50 hover:text-indigo-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}