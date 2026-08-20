export interface NavigationLink {
  label: string;
  href: string;
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