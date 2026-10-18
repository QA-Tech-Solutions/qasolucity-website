import type { Metadata } from "next";
import { SITE_URL } from "./site-config";

interface BuildMetadataInput {
  title: string;
  description?: string;
  /** Path starting with "/" - also becomes the canonical tag and og:url/twitter url. */
  path: string;
  /** Absolute or root-relative image URL. Omit to fall back to the site-wide
   * dynamic opengraph-image.tsx, which Next links automatically per route. */
  image?: string;
  type?: "website" | "article";
  /** ISO date string. Only meaningful (and only emitted) when type is "article". */
  publishedTime?: string;
  /** Keeps the page out of search results while leaving it reachable by direct link. */
  noIndex?: boolean;
}

/**
 * Every page's single source of truth for its own title/description AND
 * the social-share metadata that goes with it. Before this existed, a
 * page only overriding `title`/`description` silently kept the root
 * layout's `openGraph` and `twitter` objects untouched - Next merges
 * Metadata per top-level key, not per nested field, so every page's
 * og:title/og:description/og:url pointed at the homepage and every
 * shared link previewed as the homepage regardless of which page was
 * actually shared. Route this through here instead of writing openGraph/
 * twitter by hand so that can't happen again.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noIndex,
}: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical: path },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      ...(description ? { description } : {}),
      url,
      type,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(image ? { images: [image] } : {}),
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };
}
