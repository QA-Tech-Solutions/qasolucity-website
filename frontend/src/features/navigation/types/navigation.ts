export interface NavigationLink {
  label: string;
  href: string;
  /** Renders the link blurred and inert (no navigation) with a "Soon"
   * badge - for pages that exist in the data/routing but aren't ready
   * to be browsed to yet. */
  comingSoon?: boolean;
}

export interface NavigationSection {
  title: string;
  /** When set, the section title itself links here (e.g. an anchor on
   * the parent page's own section) instead of rendering as plain text. */
  href?: string;
  links: NavigationLink[];
}

export interface NavigationItem {
  label: string;
  href: string;
  megaMenu?: boolean;
  sections?: NavigationSection[];
  /** Shows the "Book Consultation" card in the mega menu. Defaults to true. */
  showFeaturedCard?: boolean;
  /** Renders the label as inert text instead of a Link - for a mega-menu
   * entry point whose own href doesn't resolve to a real page. */
  disableLink?: boolean;
}