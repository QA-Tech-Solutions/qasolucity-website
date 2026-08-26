import { NavigationItem } from "@/features/navigation/types/navigation"

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
          { label: "ISTQB Certification Prep", href: "/certification" },
          { label: "QA Career Launchpad", href: "/qa-career-launchpad" },
        ],
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    megaMenu: true,
    sections: [
      {
        title: "Solutions",
        links: [
          { label: "Startup QA & Launch Readiness", href: "/solutions/startup-qa-launch-readiness" },
          { label: "Release Readiness & Regression Testing", href: "/solutions/release-readiness-regression-testing" },
          { label: "Test Automation Acceleration", href: "/solutions/test-automation-acceleration" },
          { label: "API Quality & Integration Assurance", href: "/solutions/api-quality-integration-assurance" },
          { label: "Performance & Load Testing", href: "/solutions/performance-load-testing" },
          { label: "Mobile App Quality Assurance", href: "/solutions/mobile-app-quality-assurance" },
          { label: "QA Process & Strategy Consulting", href: "/solutions/qa-process-strategy-consulting" },
          { label: "Dedicated QA Team Augmentation", href: "/solutions/dedicated-qa-team-augmentation" },
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
          { label: "Blog", href: "/blogs" },
          { label: "QA Templates", href: "/resources/templates" },
          { label: "QA Guides", href: "/resources/guides" },
          { label: "E-books", href: "/resources/ebooks" },
          { label: "Events", href: "/resources/events" },
          { label: "FAQs", href: "/faq" },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
] as const;