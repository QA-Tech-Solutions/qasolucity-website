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
      <h4 className="mb-3 whitespace-nowrap text-xs font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
        {section.title}
      </h4>

      <ul className="space-y-1.5 min-w-[200px]">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="-mx-3 block rounded-xl px-3 py-1 whitespace-nowrap text-[14px] font-medium text-slate-600 dark:text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}