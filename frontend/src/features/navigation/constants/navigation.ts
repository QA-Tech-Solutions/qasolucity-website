import { NavigationItem } from "@/types/navigation"

export const navigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
    megaMenu: true,
    sections: [
      {
        title: "QA Testing",
        links: [
          { label: "Manual Testing", href: "/services/manual-testing" },
          { label: "Automation Testing", href: "/services/automation-testing" },
          { label: "API Testing", href: "/services/api-testing" },
          { label: "Performance Testing", href: "/services/performance-testing" },
        ],
      },
      {
        title: "QA Consulting",
        links: [
          { label: "QA Strategy", href: "/services/qa-strategy" },
          { label: "QA Process Setup", href: "/services/qa-process-setup" },
          { label: "Release Readiness", href: "/services/release-readiness" },
          { label: "Test Management", href: "/services/test-management" },
        ],
      },
      {
        title: "Training",
        links: [
          { label: "Corporate QA Training", href: "/services/corporate-training" },
          { label: "Tools Training", href: "/services/tools-training" },
          { label: "Workshops", href: "/services/workshops" },
        ],
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    megaMenu: true,
    sections: [
      {
        title: "Industries",
        links: [
          { label: "FinTech", href: "/industries/fintech" },
          { label: "HealthTech", href: "/industries/healthtech" },
          { label: "SaaS", href: "/industries/saas" },
          { label: "Retail", href: "/industries/retail" },
          { label: "Education", href: "/industries/education" },
          { label: "Government", href: "/industries/government" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    megaMenu: true,
    sections: [
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "QA Templates", href: "/resources/templates" },
          { label: "QA Guides", href: "/resources/guides" },
          { label: "E-books", href: "/resources/ebooks" },
          { label: "Events", href: "/resources/events" },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const;