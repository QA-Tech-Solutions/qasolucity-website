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

export interface SolutionFAQ {
  question: string;
  answer: string;
}

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
  faqs: SolutionFAQ[];
  relatedServiceSlugs: string[];
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
      "We help early-stage teams reduce launch risk, tighten critical user journeys, and create a reliable release rhythm from the first beta to product-market fit. No bloated process, just the checks that actually protect your launch.",
    highlights: ["Lean QA planning", "Release confidence reviews", "Early defect prevention"],
    outcomes: ["Ship with fewer last-minute issues", "Improve founder and investor confidence", "Drive stronger first impressions"],
    deliverables: ["Launch readiness checklist", "Defect prioritization map", "Release confidence report"],
    idealFor: ["Startups", "Founders", "Product-led teams"],
    faqs: [
      {
        question: "We're pre-launch with a small team. Is this too early for QA?",
        answer:
          "It's actually the ideal time. Catching issues before your first users do is far cheaper than fixing them after launch, and it's easier to build good habits from day one than to retrofit them later.",
      },
      {
        question: "How much of our roadmap does this take up?",
        answer:
          "We scope engagements around your launch timeline, from a focused pre-launch sprint to lightweight ongoing support as you iterate toward product-market fit.",
      },
    ],
    relatedServiceSlugs: ["manual-testing", "release-readiness", "qa-strategy"],
    icon: Rocket,
  },
  {
    slug: "release-readiness-regression-testing",
    title: "Release Readiness & Regression Testing",
    eyebrow: "Protect every release window",
    summary:
      "Create a structured release process that catches regressions, confirms critical paths, and supports better go-live decisions.",
    description:
      "We bring discipline to release management with regression-focused execution and decision support that keeps teams aligned when the stakes are high, and the release calendar isn't moving.",
    highlights: ["Regression suite design", "Release gate review", "Risk-based prioritization"],
    outcomes: ["Reduce release-related surprises", "Improve stakeholder alignment", "Make go-live decisions clearer"],
    deliverables: ["Regression test plans", "Go-live review packs", "Risk-based release summaries"],
    idealFor: ["Product teams", "Enterprise launches", "Operations leaders"],
    faqs: [
      {
        question: "Can this fit into a fixed release calendar?",
        answer:
          "Yes. We build regression coverage and gate reviews around your existing release cadence, weekly, bi-weekly, or quarterly, rather than asking you to change it.",
      },
      {
        question: "Do you only test before release, or ongoing?",
        answer:
          "Both models work. Many teams start with per-release support and move to a standing regression suite we maintain between releases.",
      },
    ],
    relatedServiceSlugs: ["release-readiness", "automation-testing", "test-management"],
    icon: BadgeCheck,
  },
  {
    slug: "test-automation-acceleration",
    title: "Test Automation Acceleration",
    eyebrow: "Scale quality without scale friction",
    summary:
      "Accelerate test automation adoption with frameworks and practices that improve speed, coverage, and maintainability.",
    description:
      "We help teams move from ad-hoc automation attempts to a sustainable quality engine that supports faster delivery across every release cycle, without the suite collapsing under its own weight six months later.",
    highlights: ["Automation strategy", "Framework setup", "CI/CD integration"],
    outcomes: ["Speed up regression cycles", "Increase trust in releases", "Reduce manual repetitive effort"],
    deliverables: ["Automation roadmap", "Reusable test suites", "Maintenance support plan"],
    idealFor: ["Scaling engineering teams", "Product delivery teams", "DevOps-led organizations"],
    faqs: [
      {
        question: "We already have some automation. Can you build on it?",
        answer:
          "Usually, yes. We start by assessing what's there, what's worth keeping, what's flaky and worth rebuilding, then extend from a stable foundation rather than starting over.",
      },
      {
        question: "What if our team doesn't have automation experience?",
        answer:
          "We can pair this with hands-on tools training so your team builds real capability alongside the suite we deliver, not just a black box to maintain.",
      },
    ],
    relatedServiceSlugs: ["automation-testing", "api-testing", "tools-training"],
    icon: Bot,
  },
  {
    slug: "api-quality-integration-assurance",
    title: "API Quality & Integration Assurance",
    eyebrow: "Make integrations dependable",
    summary:
      "Verify service contracts, payload integrity, and integration behavior so your digital ecosystem runs smoothly under real conditions.",
    description:
      "We test the invisible layers that connect your apps so your products stay reliable as systems evolve, scale, and exchange more data with partners you don't control.",
    highlights: ["Contract and payload validation", "Authentication coverage", "Fault-tolerance checks"],
    outcomes: ["Reduce integration breakages", "Improve system stability", "Support faster partner launches"],
    deliverables: ["API test suites", "Integration validation reports", "Fault-handling playbooks"],
    idealFor: ["Platform teams", "SaaS providers", "Partner integrations"],
    faqs: [
      {
        question: "Do you test integrations with third-party providers we don't control?",
        answer:
          "Yes. We test how your system behaves against real third-party responses, including their failure modes, timeouts, and rate limits, not just the happy path.",
      },
      {
        question: "Can you validate a new integration before it goes live?",
        answer:
          "Absolutely. This is one of the most common triggers for this engagement, validating a new partner or platform integration before it touches production traffic.",
      },
    ],
    relatedServiceSlugs: ["api-testing", "automation-testing", "qa-process-setup"],
    icon: ArrowRightLeft,
  },
  {
    slug: "performance-load-testing",
    title: "Performance & Load Testing",
    eyebrow: "Keep experiences fast under pressure",
    summary:
      "Evaluate scalability, response times, and resilience so your product remains stable during spikes and growth.",
    description:
      "We help teams identify bottlenecks and ensure critical user journeys perform well under intended load, seasonal demand, and ambitious growth plans that outpace last year's infrastructure decisions.",
    highlights: ["Load and stress runs", "Performance diagnostics", "Capacity insights"],
    outcomes: ["Protect user experience", "Reduce production incidents", "Improve infrastructure confidence"],
    deliverables: ["Performance test scripts", "Benchmark reports", "Optimization recommendations"],
    idealFor: ["High-traffic apps", "Retail and SaaS", "Growth-stage teams"],
    faqs: [
      {
        question: "We have a big traffic event coming up. Can you help us prepare?",
        answer:
          "Yes, this is exactly the kind of engagement we're built for. We model expected load ahead of a launch, campaign, or seasonal peak and stress-test before it matters.",
      },
      {
        question: "Will testing affect our production environment?",
        answer:
          "No. We test in staging or a dedicated environment with agreed thresholds, so load testing never puts live traffic or data at risk.",
      },
    ],
    relatedServiceSlugs: ["performance-testing", "qa-strategy"],
    icon: ChartNoAxesCombined,
  },
  {
    slug: "mobile-app-quality-assurance",
    title: "Mobile App Quality Assurance",
    eyebrow: "Deliver polished releases across devices",
    summary:
      "Validate mobile functionality across real device conditions to create a smooth and dependable experience for every user.",
    description:
      "We cover mobile app quality from functional validation to device and OS variability so teams can ship with more confidence, on the devices your users actually carry, not just the simulator.",
    highlights: ["Cross-device testing", "Device matrix planning", "User journey validation"],
    outcomes: ["Improve app store quality", "Reduce device-specific defects", "Increase retention and trust"],
    deliverables: ["Mobile test packs", "Device coverage matrix", "Release readiness notes"],
    idealFor: ["Mobile-first teams", "Consumer apps", "Product growth teams"],
    faqs: [
      {
        question: "Do you test on real devices?",
        answer:
          "Yes, for the devices and OS versions that matter most to your user base, supplemented with broader emulator coverage for less common combinations.",
      },
      {
        question: "Can you help with app store review issues too?",
        answer:
          "We can review your app against common App Store and Play Store rejection reasons as part of release readiness, so review isn't the first place issues surface.",
      },
    ],
    relatedServiceSlugs: ["manual-testing", "automation-testing", "performance-testing"],
    icon: Smartphone,
  },
  {
    slug: "qa-process-strategy-consulting",
    title: "QA Process & Strategy Consulting",
    eyebrow: "Turn quality into a repeatable advantage",
    summary:
      "Build a practical QA operating model that aligns people, tools, and delivery expectations across the business.",
    description:
      "We help organizations design sustainable quality practices that improve delivery consistency without adding bureaucracy or overhead nobody asked for.",
    highlights: ["Strategy workshops", "Operating model design", "Tooling and governance advisory"],
    outcomes: ["Reduce wasted effort", "Improve accountability", "Create stronger release discipline"],
    deliverables: ["QA strategy documents", "Process maps", "Governance templates"],
    idealFor: ["Leadership teams", "Maturing organizations", "Transformation programs"],
    faqs: [
      {
        question: "Is this a one-time engagement or ongoing?",
        answer:
          "Most engagements start with a focused assessment and roadmap, then shift to lighter-touch advisory as your team implements the changes.",
      },
      {
        question: "Will this require us to change tools we already use?",
        answer:
          "Not necessarily. We design the operating model around your existing tools where possible, and only recommend a change when it's clearly the right call.",
      },
    ],
    relatedServiceSlugs: ["qa-strategy", "qa-process-setup", "test-management"],
    icon: Blocks,
  },
  {
    slug: "dedicated-qa-team-augmentation",
    title: "Dedicated QA Team Augmentation",
    eyebrow: "Extend your team without losing momentum",
    summary:
      "Bring in experienced QA professionals who blend into your team and help improve quality delivery from day one.",
    description:
      "We augment your team with skilled quality engineers who support execution, collaboration, and continuous improvement across your delivery lifecycle, embedded in your standups, not sitting outside them.",
    highlights: ["Embedded team support", "Flexible scaling", "Cross-functional collaboration"],
    outcomes: ["Increase delivery capacity", "Improve quality ownership", "Reduce hiring friction"],
    deliverables: ["Team onboarding plan", "Execution support", "Progress and quality reporting"],
    idealFor: ["Growing teams", "Resource-constrained orgs", "Complex product delivery"],
    faqs: [
      {
        question: "How quickly can someone join our team?",
        answer:
          "Typically within one to two weeks of scoping the engagement, depending on the skill mix and domain context needed.",
      },
      {
        question: "Can we scale the team size up or down as needs change?",
        answer:
          "Yes, that flexibility is the point. We adjust capacity as your roadmap, budget, or delivery pressure changes, without a lengthy re-contracting process.",
      },
    ],
    relatedServiceSlugs: ["corporate-training", "qa-process-setup", "test-management"],
    icon: Cpu,
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
