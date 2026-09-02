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
        title: "Full-Cycle Testing Services",
        links: [
          { label: "QA & Software Testing", href: "/services/qa-software-testing" },
          { label: "Test Automation", href: "/services/automation-testing" },
          { label: "API Testing", href: "/services/api-testing" },
          { label: "Performance Testing", href: "/services/performance-testing" },
          { label: "AI Testing", href: "/services/ai-testing" },
          { label: "Security Testing", href: "/services/security-testing" },
          { label: "QA Consulting", href: "/services/qa-consulting" },
          { label: "Testing as a Service (TaaS)", href: "/services/testing-as-a-service" },
          { label: "Staff Augmentation", href: "/services/staff-augmentation" },
          { label: "DevOps", href: "/services/devops" },
        ],
      },
      {
        title: "Training",
        links: [
          { label: "QA Career Launchpad", href: "/qa-career-launchpad" },
          { label: "ISTQB Certification Prep", href: "/certification" },
          { label: "Tools Proficiency Training", href: "/services/tools-training" },
          { label: "Corporate QA Training", href: "/services/corporate-training" },
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