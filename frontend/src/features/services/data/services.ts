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

export interface ServiceFAQ {
  question: string;
  answer: string;
}

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
  tools: string[];
  idealFor: string[];
  faqs: ServiceFAQ[];
  icon: LucideIcon;
}

export const serviceCategories = [
  {
    name: "QA Testing",
    description:
      "Hands-on testing across every layer of your product, from first click to full-scale load.",
  },
  {
    name: "QA Consulting",
    description:
      "Strategic guidance to help you plan, structure and scale quality with confidence.",
  },
  {
    name: "Training",
    description:
      "Practical, hands-on learning that builds real QA capability, on your team and beyond it.",
  },
] as const;

export const services: ServiceDetail[] = [
  {
    slug: "manual-testing",
    title: "Manual Testing",
    category: "QA Testing",
    eyebrow: "Hands-on validation",
    summary:
      "Catch user experience issues, edge cases, and release blockers before customers ever see them.",
    description:
      "Our manual testing engagements give product teams a human-first layer of validation for critical flows, visual polish, and usability across web and mobile experiences. Automation is fast, but it can't judge whether something feels right, that's where our testers come in.",
    highlights: [
      "Exploratory and scripted test execution",
      "Cross-browser and device validation",
      "Detailed bug reports with clear evidence",
      "Usability and accessibility spot checks",
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
    tools: ["BrowserStack", "Jira", "TestRail", "Figma"],
    idealFor: ["Early-stage releases", "Customer-facing products", "Complex workflows"],
    faqs: [
      {
        question: "Do you test on real devices or emulators?",
        answer:
          "Both. We use real-device labs for the browsers and devices your users actually use, and emulators for broader coverage where it makes sense.",
      },
      {
        question: "Can you work within our existing sprint cycle?",
        answer:
          "Yes. We embed into your sprint cadence, testing new work as it's ready rather than waiting for a separate QA phase at the end.",
      },
    ],
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
      "We build resilient automation suites for web, API, and mobile workflows so your build pipeline stays fast, dependable, and release-ready. Every suite is built to be maintained, not thrown away six months in.",
    highlights: [
      "Playwright and Cypress automation",
      "CI/CD integration for repeatable runs",
      "Reusable page object and test architecture",
      "Flaky test triage and stabilization",
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
    tools: ["Playwright", "Cypress", "Selenium", "GitHub Actions"],
    idealFor: ["Frequent releases", "Fast-growing products", "Regression-heavy teams"],
    faqs: [
      {
        question: "Which automation framework do you use?",
        answer:
          "Primarily Playwright for modern web apps, with Cypress or Selenium where a codebase already depends on them. We pick the tool that fits your stack, not the other way round.",
      },
      {
        question: "Who maintains the automation suite after delivery?",
        answer:
          "We hand over a documented, CI-integrated suite your team can own from day one, or we can stay on for ongoing maintenance if you'd rather we carry that load.",
      },
    ],
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
      "From contract checks to end-to-end payload validation, we help teams ensure every integration layer behaves the way it should under real-world conditions, including the ones that only show up when something else fails first.",
    highlights: [
      "Schema and contract validation",
      "Authentication and permission checks",
      "Performance and resilience coverage",
      "Negative and edge-case testing",
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
    tools: ["Postman", "Swagger/OpenAPI", "REST Assured", "Newman"],
    idealFor: ["Microservices", "Platform teams", "Third-party integrations"],
    faqs: [
      {
        question: "Do you test authentication and security edge cases?",
        answer:
          "Yes, token expiry, permission boundaries, and malformed or malicious payloads are all part of a standard API testing engagement.",
      },
      {
        question: "Can you validate third-party API integrations?",
        answer:
          "Absolutely. We test how your system handles both the happy path and the failure modes of any external service you depend on.",
      },
    ],
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
      "We test scalability, response time, concurrency, and stability so your product performs consistently under real load conditions, not just the calm traffic of a demo environment.",
    highlights: [
      "Load, stress, and endurance testing",
      "Performance bottleneck analysis",
      "Benchmarking and trend reporting",
      "Scalability and capacity planning support",
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
    tools: ["k6", "JMeter", "Grafana", "Locust"],
    idealFor: ["High-traffic products", "E-commerce", "SaaS platforms"],
    faqs: [
      {
        question: "What load levels do you typically test for?",
        answer:
          "We model load based on your real or projected traffic, everyday peaks, seasonal spikes, and worst-case scenarios like a marketing campaign or product launch going better than planned.",
      },
      {
        question: "Can you test in our staging environment safely?",
        answer:
          "Yes. We agree on safe testing windows and thresholds up front so load testing never puts a shared environment or production data at risk.",
      },
    ],
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
      "We help organizations define the right testing approach, tooling mix, and operating model so quality engineering becomes an advantage rather than a bottleneck, wherever you're starting from.",
    highlights: [
      "Quality maturity assessment",
      "Test strategy and coverage planning",
      "Toolchain and process advisory",
      "Risk-based testing prioritization",
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
    tools: ["Risk-based testing", "Test pyramid modelling", "Quality maturity frameworks"],
    idealFor: ["Scaling teams", "New product portfolios", "Leadership planning"],
    faqs: [
      {
        question: "How long does a QA strategy engagement take?",
        answer:
          "A typical assessment and roadmap takes two to four weeks, depending on how many products and teams are in scope.",
      },
      {
        question: "Do you work with our existing QA team or replace them?",
        answer:
          "We work alongside your existing team. The goal is a strategy your people can execute, not a plan that sidelines them.",
      },
    ],
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
      "We design practical QA processes for defect management, test governance, and handoffs so teams can move faster without sacrificing consistency, and without drowning in process for its own sake.",
    highlights: [
      "Workflow design and documentation",
      "Defect lifecycle standardization",
      "Team role and handoff alignment",
      "Entry and exit criteria for every stage",
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
    tools: ["Jira workflows", "Confluence", "Azure DevOps", "TestRail"],
    idealFor: ["Growing organizations", "Cross-functional teams", "New QA functions"],
    faqs: [
      {
        question: "Will this disrupt our current sprint cadence?",
        answer:
          "No. We design around your existing cadence and roll changes in incrementally, so teams adapt without a disruptive reset.",
      },
      {
        question: "Do you work with tools we already use?",
        answer:
          "Yes. We build processes around your existing stack (Jira, Azure DevOps, Linear, or otherwise) rather than asking you to adopt new tooling.",
      },
    ],
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
      "We help leadership and delivery teams determine whether a release is truly ready, and where to focus effort before go-live, with evidence instead of gut feel.",
    highlights: [
      "Release gate review",
      "Risk assessment and evidence gathering",
      "Go-live decision support",
      "Post-release monitoring checklist",
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
    tools: ["Release checklists", "Risk matrices", "Jira", "Confluence"],
    idealFor: ["Product launches", "Enterprise releases", "Regulated environments"],
    faqs: [
      {
        question: "How far before launch should we start?",
        answer:
          "Ideally one to two weeks before go-live, enough time to act on what we find without last-minute pressure to skip fixes.",
      },
      {
        question: "What happens if a release isn't ready?",
        answer:
          "You get a clear, evidence-backed picture of what's blocking readiness and what it would take to close the gap, so the go/no-go decision is yours to make with full information.",
      },
    ],
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
      "We support test planning, execution oversight, and quality reporting so stakeholders always know where risk sits and what needs attention, without chasing updates across five different tools.",
    highlights: [
      "Testing dashboards and status reporting",
      "Requirement traceability",
      "Execution and defect coordination",
      "Cross-team test planning",
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
    tools: ["TestRail", "Zephyr", "Jira", "Xray"],
    idealFor: ["Distributed teams", "Enterprise programs", "Delivery leadership"],
    faqs: [
      {
        question: "Do you provide ongoing reporting, or a one-time setup?",
        answer:
          "Both are available. Many teams start with a setup engagement, then keep us on for ongoing reporting and coordination as the program runs.",
      },
      {
        question: "Can this integrate with our existing project tools?",
        answer:
          "Yes. We build reporting and traceability on top of the tools you already use rather than introducing a parallel system to maintain.",
      },
    ],
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
      "Our corporate training programs blend core QA principles, modern tooling, and real product scenarios to help teams perform better in daily delivery, not just pass a quiz at the end.",
    highlights: [
      "Custom curriculum for your team",
      "Hands-on exercises and coaching",
      "Flexible delivery for in-person or remote teams",
      "Real product scenarios, not generic examples",
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
    tools: ["Custom curriculum", "Hands-on labs", "Playwright", "Real case studies"],
    idealFor: ["Rising product teams", "New QA hires", "Upskilling initiatives"],
    faqs: [
      {
        question: "How many people can join a training program?",
        answer:
          "We run sessions for small squads up to full departments. Group size shapes the format, hands-on labs work best in smaller cohorts.",
      },
      {
        question: "Is training delivered remotely or on-site?",
        answer:
          "Both. Most teams choose remote for flexibility, but we're happy to run in-person sessions where that fits better.",
      },
    ],
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
      "We coach teams on essentials like Playwright, Selenium, Jira, and test execution workflows so they can move from theory to execution faster, with real tasks instead of toy examples.",
    highlights: [
      "Tool-focused practical sessions",
      "Workflow and process integration",
      "Role-based learning paths",
      "Live troubleshooting and Q&A",
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
    tools: ["Playwright", "Selenium", "Jira", "Postman"],
    idealFor: ["QA teams", "Developers", "Ops and product teams"],
    faqs: [
      {
        question: "Which tools can you train our team on?",
        answer:
          "Most testing and delivery tools in common use, Playwright, Selenium, Postman, Jira, and more. Tell us your stack and we'll tailor the session to it.",
      },
      {
        question: "Do you provide hands-on exercises, not just lectures?",
        answer:
          "Always. Every session is built around real tasks on real (or realistic) test environments, not slides alone.",
      },
    ],
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
      "Our workshops create space for teams to assess current processes, identify improvements, and leave with a practical action plan for the next sprint or quarter, not just a nice conversation.",
    highlights: [
      "Facilitated problem-solving sessions",
      "Action-oriented outcomes",
      "Customised to your context",
      "Cross-functional participation",
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
    tools: ["Facilitation frameworks", "Miro/FigJam", "Retrospective formats"],
    idealFor: ["Leadership sessions", "Team retrospectives", "Delivery reviews"],
    faqs: [
      {
        question: "How long does a typical workshop run?",
        answer:
          "Most run two to four hours, though we can scale up to a full-day session for larger topics like a quarterly QA review.",
      },
      {
        question: "Can workshops be run remotely?",
        answer:
          "Yes. We facilitate remote workshops with the same collaborative tools (Miro, FigJam) used in person, so distributed teams get the full experience.",
      },
    ],
    icon: Sparkles,
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: ServiceDetail, limit = 3) {
  return services
    .filter((item) => item.category === service.category && item.slug !== service.slug)
    .slice(0, limit);
}
