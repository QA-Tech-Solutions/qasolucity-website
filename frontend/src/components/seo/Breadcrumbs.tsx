import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE_URL } from "@/lib/site-config";

export interface Crumb {
  label: string;
  /** Omit on the last crumb - the current page isn't a link to itself. */
  href?: string;
}

/**
 * The BreadcrumbList JSON-LD for a trail, as a plain object - render it
 * from the route's own page.tsx (a Server Component, alongside whatever
 * other JSON-LD that page already emits) rather than from
 * <BreadcrumbTrail> below. The pages this is meant for (service/blog/job
 * detail) are themselves client components for their animations, so a
 * script tag rendered from inside one of them would only reach the DOM
 * after hydration - fine for the visible trail, not for the structured
 * data search engines are the actual point of adding.
 */
export function buildBreadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

/**
 * The visible trail only - matches whatever Crumb[] the same page passed
 * to buildBreadcrumbJsonLd, so the structured data reflects what a
 * visitor actually sees (Google's own guidance for BreadcrumbList).
 */
export function BreadcrumbTrail({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-600" />}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-slate-700 dark:text-slate-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
