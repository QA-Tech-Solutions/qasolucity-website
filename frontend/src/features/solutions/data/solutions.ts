import {
  ArrowRightLeft,
  BadgeCheck,
  Blocks,
  Bot,
  ChartNoAxesCombined,
  Cpu,
  Rocket,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export interface SolutionDetail {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: string[];
  outcomes: string[];
  deliverables: string[];
  idealFor: string[];
  icon: LucideIcon;
}

export const solutions: SolutionDetail[] = [
  {
    slug: "startup-qa-launch-readiness",
    title: "Startup QA & Launch Readiness",
    eyebrow: "Move fast without breaking trust",
    summary:
      "Help ambitious startups ship with confidence by combining lean QA practices with launch-focused readiness checks.",
    description:
      "We help early-stage teams reduce launch risk, tighten critical user journeys, and create a reliable release rhythm from the first beta to product-market fit.",
    highlights: ["Lean QA planning", "Release confidence reviews", "Early defect prevention"],
    outcomes: ["Ship with fewer last-minute issues", "Improve founder and investor confidence", "Drive stronger first impressions"],
    deliverables: ["Launch readiness checklist", "Defect prioritization map", "Release confidence report"],
    idealFor: ["Startups", "Founders", "Product-led teams"],
    icon: Rocket,
  },
  {
    slug: "release-readiness-regression-testing",
    title: "Release Readiness & Regression Testing",
    eyebrow: "Protect every release window",
    summary:
      "Create a structured release process that catches regressions, confirms critical paths, and supports better go-live decisions.",
    description:
      "We bring discipline to release management with regression-focused execution and decision support that keeps teams aligned when the stakes are high.",
    highlights: ["Regression suite design", "Release gate review", "Risk-based prioritization"],
    outcomes: ["Reduce release-related surprises", "Improve stakeholder alignment", "Make go-live decisions clearer"],
    deliverables: ["Regression test plans", "Go-live review packs", "Risk-based release summaries"],
    idealFor: ["Product teams", "Enterprise launches", "Operations leaders"],
    icon: BadgeCheck,
  },
  {
    slug: "test-automation-acceleration",
    title: "Test Automation Acceleration",
    eyebrow: "Scale quality without scale friction",
    summary:
      "Accelerate test automation adoption with frameworks and practices that improve speed, coverage, and maintainability.",
    description:
      "We help teams move from ad-hoc automation attempts to a sustainable quality engine that supports faster delivery across every release cycle.",
    highlights: ["Automation strategy", "Framework setup", "CI/CD integration"],
    outcomes: ["Speed up regression cycles", "Increase trust in releases", "Reduce manual repetitive effort"],
    deliverables: ["Automation roadmap", "Reusable test suites", "Maintenance support plan"],
    idealFor: ["Scaling engineering teams", "Product delivery teams", "DevOps-led organizations"],
    icon: Bot,
  },
  {
    slug: "api-quality-integration-assurance",
    title: "API Quality & Integration Assurance",
    eyebrow: "Make integrations dependable",
    summary:
      "Verify service contracts, payload integrity, and integration behavior so your digital ecosystem runs smoothly under real conditions.",
    description:
      "We test the invisible layers that connect your apps so your products stay reliable as systems evolve, scale, and exchange more data.",
    highlights: ["Contract and payload validation", "Authentication coverage", "Fault-tolerance checks"],
    outcomes: ["Reduce integration breakages", "Improve system stability", "Support faster partner launches"],
    deliverables: ["API test suites", "Integration validation reports", "Fault-handling playbooks"],
    idealFor: ["Platform teams", "SaaS providers", "Partner integrations"],
    icon: ArrowRightLeft,
  },
  {
    slug: "performance-load-testing",
    title: "Performance & Load Testing",
    eyebrow: "Keep experiences fast under pressure",
    summary:
      "Evaluate scalability, response times, and resilience so your product remains stable during spikes and growth.",
    description:
      "We help teams identify bottlenecks and ensure critical user journeys perform well under intended load, seasonal demand, and ambitious growth plans.",
    highlights: ["Load and stress runs", "Performance diagnostics", "Capacity insights"],
    outcomes: ["Protect user experience", "Reduce production incidents", "Improve infrastructure confidence"],
    deliverables: ["Performance test scripts", "Benchmark reports", "Optimization recommendations"],
    idealFor: ["High-traffic apps", "Retail and SaaS", "Growth-stage teams"],
    icon: ChartNoAxesCombined,
  },
  {
    slug: "mobile-app-quality-assurance",
    title: "Mobile App Quality Assurance",
    eyebrow: "Deliver polished releases across devices",
    summary:
      "Validate mobile functionality across real device conditions to create a smooth and dependable experience for every user.",
    description:
      "We cover mobile app quality from functional validation to device and OS variability so teams can ship with more confidence.",
    highlights: ["Cross-device testing", "Device matrix planning", "User journey validation"],
    outcomes: ["Improve app store quality", "Reduce device-specific defects", "Increase retention and trust"],
    deliverables: ["Mobile test packs", "Device coverage matrix", "Release readiness notes"],
    idealFor: ["Mobile-first teams", "Consumer apps", "Product growth teams"],
    icon: Smartphone,
  },
  {
    slug: "qa-process-strategy-consulting",
    title: "QA Process & Strategy Consulting",
    eyebrow: "Turn quality into a repeatable advantage",
    summary:
      "Build a practical QA operating model that aligns people, tools, and delivery expectations across the business.",
    description:
      "We help organizations design sustainable quality practices that improve delivery consistency without adding bureaucracy or overhead.",
    highlights: ["Strategy workshops", "Operating model design", "Tooling and governance advisory"],
    outcomes: ["Reduce wasted effort", "Improve accountability", "Create stronger release discipline"],
    deliverables: ["QA strategy documents", "Process maps", "Governance templates"],
    idealFor: ["Leadership teams", "Maturing organizations", "Transformation programs"],
    icon: Blocks,
  },
  {
    slug: "dedicated-qa-team-augmentation",
    title: "Dedicated QA Team Augmentation",
    eyebrow: "Extend your team without losing momentum",
    summary:
      "Bring in experienced QA professionals who blend into your team and help improve quality delivery from day one.",
    description:
      "We augment your team with skilled quality engineers who support execution, collaboration, and continuous improvement across your delivery lifecycle.",
    highlights: ["Embedded team support", "Flexible scaling", "Cross-functional collaboration"],
    outcomes: ["Increase delivery capacity", "Improve quality ownership", "Reduce hiring friction"],
    deliverables: ["Team onboarding plan", "Execution support", "Progress and quality reporting"],
    idealFor: ["Growing teams", "Resource-constrained orgs", "Complex product delivery"],
    icon: Cpu,
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
