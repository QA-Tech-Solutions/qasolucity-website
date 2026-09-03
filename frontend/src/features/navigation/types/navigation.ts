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
  links: NavigationLink[];
}

export interface NavigationItem {
  label: string;
  href: string;
  megaMenu?: boolean;
  sections?: NavigationSection[];
}