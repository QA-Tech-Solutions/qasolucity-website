import {
  Activity,
  BadgeCheck,
  BookOpen,
  Bot,
  BrainCircuit,
  GraduationCap,
  Radar,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface ServiceDetail {
  slug: string;
  title: string;
  category: string;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: string[];
  outcomes: string[];
  deliverables: string[];
  idealFor: string[];
  icon: LucideIcon;
}

export const services: ServiceDetail[] = [
  {
    slug: "manual-testing",
    title: "Manual Testing",
    category: "QA Testing",
    eyebrow: "Hands-on validation",
    summary:
      "Catch user experience issues, edge cases, and release blockers before customers ever see them.",
    description:
      "Our manual testing engagements give product teams a human-first layer of validation for critical flows, visual polish, and usability across web and mobile experiences.",
    highlights: [
      "Exploratory and scripted test execution",
      "Cross-browser and device validation",
      "Detailed bug reports with clear evidence",
    ],
    outcomes: [
      "Find critical product defects earlier",
      "Improve usability before launch",
      "Reduce customer-facing surprises",
    ],
    deliverables: [
      "Test execution reports",
      "Defect triage support",
      "Release readiness summaries",
    ],
    idealFor: ["Early-stage releases", "Customer-facing products", "Complex workflows"],
    icon: ShieldCheck,
  },
  {
    slug: "automation-testing",
    title: "Automation Testing",
    category: "QA Testing",
    eyebrow: "Scale with confidence",
    summary:
      "Accelerate regression testing with stable automation frameworks that remove repetitive work from your team.",
    description:
      "We build resilient automation suites for web, API, and mobile workflows so your build pipeline stays fast, dependable, and release-ready.",
    highlights: [
      "Playwright and Cypress automation",
      "CI/CD integration for repeatable runs",
      "Reusable page object and test architecture",
    ],
    outcomes: [
      "Shrink regression cycle time",
      "Improve coverage without added overhead",
      "Support continuous delivery with confidence",
    ],
    deliverables: [
      "Automated regression suites",
      "CI workflow integration",
      "Maintenance plans and support",
    ],
    idealFor: ["Frequent releases", "Fast-growing products", "Regression-heavy teams"],
    icon: Bot,
  },
  {
    slug: "api-testing",
    title: "API Testing",
    category: "QA Testing",
    eyebrow: "Reliable integrations",
    summary:
      "Validate service contracts, data integrity, and edge conditions across APIs and integrations.",
    description:
      "From contract checks to end-to-end payload validation, we help teams ensure every integration layer behaves the way it should under real-world conditions.",
    highlights: [
      "Schema and contract validation",
      "Authentication and permission checks",
      "Performance and resilience coverage",
    ],
    outcomes: [
      "Reduce integration failures",
      "Improve service reliability",
      "Make releases safer across ecosystems",
    ],
    deliverables: [
      "API test suites",
      "Error-handling validation reports",
      "Integration assurance playbooks",
    ],
    idealFor: ["Microservices", "Platform teams", "Third-party integrations"],
    icon: Activity,
  },
  {
    slug: "performance-testing",
    title: "Performance Testing",
    category: "QA Testing",
    eyebrow: "Speed under pressure",
    summary:
      "Reveal bottlenecks before they become user-visible issues during product launches or peak traffic.",
    description:
      "We test scalability, response time, concurrency, and stability so your product performs consistently under real load conditions.",
    highlights: [
      "Load, stress, and endurance testing",
      "Performance bottleneck analysis",
      "Benchmarking and trend reporting",
    ],
    outcomes: [
      "Protect user experience at scale",
      "Prevent rollout failures",
      "Improve infrastructure decisions",
    ],
    deliverables: [
      "Performance test plans",
      "Load test scripts",
      "Optimization recommendations",
    ],
    idealFor: ["High-traffic products", "E-commerce", "SaaS platforms"],
    icon: Radar,
  },
  {
    slug: "qa-strategy",
    title: "QA Strategy",
    category: "QA Consulting",
    eyebrow: "Smart quality planning",
    summary:
      "Shape a quality roadmap that scales with your product, team maturity, and delivery model.",
    description:
      "We help organizations define the right testing approach, tooling mix, and operating model so quality engineering becomes an advantage rather than a bottleneck.",
    highlights: [
      "Quality maturity assessment",
      "Test strategy and coverage planning",
      "Toolchain and process advisory",
    ],
    outcomes: [
      "Create better release decisions",
      "Align QA with business goals",
      "Reduce wasted effort and rework",
    ],
    deliverables: [
      "QA strategy documents",
      "Roadmaps and recommendations",
      "Stakeholder workshops",
    ],
    idealFor: ["Scaling teams", "New product portfolios", "Leadership planning"],
    icon: BrainCircuit,
  },
  {
    slug: "qa-process-setup",
    title: "QA Process Setup",
    category: "QA Consulting",
    eyebrow: "Operational clarity",
    summary:
      "Turn testing into a repeatable, efficient system with clear ownership and delivery workflows.",
    description:
      "We design practical QA processes for defect management, test governance, and handoffs so teams can move faster without sacrificing consistency.",
    highlights: [
      "Workflow design and documentation",
      "Defect lifecycle standardization",
      "Team role and handoff alignment",
    ],
    outcomes: [
      "Reduce friction across teams",
      "Improve accountability",
      "Create a stronger release rhythm",
    ],
    deliverables: [
      "Process documentation",
      "Governance templates",
      "Operational playbooks",
    ],
    idealFor: ["Growing organizations", "Cross-functional teams", "New QA functions"],
    icon: BookOpen,
  },
  {
    slug: "release-readiness",
    title: "Release Readiness",
    category: "QA Consulting",
    eyebrow: "Launch with confidence",
    summary:
      "Evaluate the health of every release with focused checks that reduce launch risk and support better decisions.",
    description:
      "We help leadership and delivery teams determine whether a release is truly ready, and where to focus effort before go-live.",
    highlights: [
      "Release gate review",
      "Risk assessment and evidence gathering",
      "Go-live decision support",
    ],
    outcomes: [
      "Reduce launch incidents",
      "Improve stakeholder confidence",
      "Create a clearer release narrative",
    ],
    deliverables: [
      "Readiness review reports",
      "Risk summaries",
      "Launch decision support",
    ],
    idealFor: ["Product launches", "Enterprise releases", "Regulated environments"],
    icon: BadgeCheck,
  },
  {
    slug: "test-management",
    title: "Test Management",
    category: "QA Consulting",
    eyebrow: "Visible delivery health",
    summary:
      "Bring structure to your quality program with actionable reporting and sharper execution oversight.",
    description:
      "We support test planning, execution oversight, and quality reporting so stakeholders always know where risk sits and what needs attention.",
    highlights: [
      "Testing dashboards and status reporting",
      "Requirement traceability",
      "Execution and defect coordination",
    ],
    outcomes: [
      "Improve visibility across teams",
      "Make quality more measurable",
      "Support faster decisions and fewer surprises",
    ],
    deliverables: [
      "Test plans and trackers",
      "Executive reporting templates",
      "Coordination support",
    ],
    idealFor: ["Distributed teams", "Enterprise programs", "Delivery leadership"],
    icon: Activity,
  },
  {
    slug: "corporate-training",
    title: "Corporate QA Training",
    category: "Training",
    eyebrow: "Upskill teams",
    summary:
      "Build stronger QA capability across your organization with practical learning that sticks.",
    description:
      "Our corporate training programs blend core QA principles, modern tooling, and real product scenarios to help teams perform better in daily delivery.",
    highlights: [
      "Custom curriculum for your team",
      "Hands-on exercises and coaching",
      "Flexible delivery for in-person or remote teams",
    ],
    outcomes: [
      "Strengthen team capability",
      "Reduce avoidable defects",
      "Improve collaboration and ownership",
    ],
    deliverables: [
      "Training materials",
      "Exercise kits",
      "Post-training guidance",
    ],
    idealFor: ["Rising product teams", "New QA hires", "Upskilling initiatives"],
    icon: GraduationCap,
  },
  {
    slug: "tools-training",
    title: "Tools Training",
    category: "Training",
    eyebrow: "Get hands-on quickly",
    summary:
      "Help your team become productive with the tools they use every day for quality engineering and delivery.",
    description:
      "We coach teams on essentials like Playwright, Selenium, Jira, and test execution workflows so they can move from theory to execution faster.",
    highlights: [
      "Tool-focused practical sessions",
      "Workflow and process integration",
      "Role-based learning paths",
    ],
    outcomes: [
      "Raise tool adoption",
      "Improve delivery efficiency",
      "Reduce onboarding friction",
    ],
    deliverables: [
      "Training playbooks",
      "Tool walkthroughs",
      "Implementation checklists",
    ],
    idealFor: ["QA teams", "Developers", "Ops and product teams"],
    icon: Wrench,
  },
  {
    slug: "workshops",
    title: "Workshops",
    category: "Training",
    eyebrow: "Collaborative problem-solving",
    summary:
      "Run focused sessions that help teams clarify priorities, uncover gaps, and make better decisions.",
    description:
      "Our workshops create space for teams to assess current processes, identify improvements, and leave with a practical action plan for the next sprint or quarter.",
    highlights: [
      "Facilitated problem-solving sessions",
      "Action-oriented outcomes",
      "Customised to your context",
    ],
    outcomes: [
      "Unblock team bottlenecks",
      "Create shared alignment",
      "Turn ideas into action quickly",
    ],
    deliverables: [
      "Workshop agendas",
      "Action plans",
      "Facilitator notes",
    ],
    idealFor: ["Leadership sessions", "Team retrospectives", "Delivery reviews"],
    icon: Sparkles,
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
