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
      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {section.title}
      </h4>

      <ul className="space-y-3">
        {section.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}