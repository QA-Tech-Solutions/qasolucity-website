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
        {section.links.map((link) =>
          link.comingSoon ? (
            <li key={link.href}>
              <span
                aria-disabled="true"
                className="-mx-3 flex cursor-not-allowed items-center gap-2 rounded-xl px-3 py-1 whitespace-nowrap text-[14px] font-medium text-slate-400 dark:text-slate-600"
              >
                <span className="select-none">{link.label}</span>
                <span className="shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-600">
                  Soon
                </span>
              </span>
            </li>
          ) : (
            <li key={link.href}>
              <Link
                href={link.href}
                className="-mx-3 block rounded-xl px-3 py-1 whitespace-nowrap text-[14px] font-medium text-slate-600 dark:text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {link.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}