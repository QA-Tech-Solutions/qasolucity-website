import {
  Activity,
  Award,
  Ban,
  Bot,
  BrainCircuit,
  Compass,
  Crosshair,
  Database,
  FlaskConical,
  Gauge,
  GraduationCap,
  Lock,
  Puzzle,
  Rocket,
  ShieldAlert,
  ShieldCheck,
  Users,
  Webhook,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceCapability {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional - links the card to that capability's own dedicated
   * service page instead of leaving it purely descriptive. */
  href?: string;
}

export interface StickyScrollItem {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets?: string[];
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceComparisonRow {
  label: string;
  without: string;
  with: string;
}

export interface ServiceVisualChecklistItem {
  label: string;
  /** "done" and "pending" are neutral progress states; "flag" is the one
   * item in the middle of being caught - every service's checklist has
   * exactly one, since that's the moment the illustration is telling. */
  status: "done" | "flag" | "pending";
}

export interface ServiceDetail {
  slug: string;
  title: string;
  category: "Full-Cycle Testing Services" | "Training";
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
  /** Overrides the default `/services/${slug}` destination - used for
   * services that live on their own dedicated route instead of the
   * generic service detail page. */
  href?: string;
  /** Curated related-service picks, in priority order. Falls back to
   * same-category services when omitted (see getRelatedServices). */
  relatedSlugs?: string[];
  stats?: ServiceStat[];
  stickyScroll?: {
    eyebrow: string;
    heading: string;
    intro?: string;
    items: StickyScrollItem[];
  };
  capabilityGrid?: {
    eyebrow: string;
    heading: string;
    intro?: string;
    items: ServiceCapability[];
    columns?: 2 | 3;
  };
  process?: {
    eyebrow: string;
    heading: string;
    intro?: string;
    steps: ServiceProcessStep[];
  };
  comparison?: {
    eyebrow: string;
    heading: string;
    intro?: string;
    withoutLabel?: string;
    withLabel?: string;
    rows: ServiceComparisonRow[];
  };
  /** Drives the "live test run" banner illustration below the hero on
   * Full-Cycle Testing Services pages - a per-service checklist so the
   * same visual composition tells a different, relevant story on every
   * page instead of repeating one generic scene. */
  visual?: {
    checklist: ServiceVisualChecklistItem[];
  };
}

export const serviceCategories = [
  {
    name: "Full-Cycle Testing Services",
    description:
      "Hands-on testing and specialist engineering across every layer of your product, from first click to full-scale load, plus the consulting and delivery models that keep it running.",
  },
  {
    name: "Training",
    description:
      "Practical, mentor-led learning that builds real QA capability, on your team, in your career, or across your organization.",
  },
] as const;

export const services: ServiceDetail[] = [
  // ---------------------------------------------------------------------
  // Full-Cycle Testing Services
  // ---------------------------------------------------------------------
  {
    slug: "qa-software-testing",
    title: "QA & Software Testing",
    category: "Full-Cycle Testing Services",
    eyebrow: "The foundation of every release",
    summary:
      "Full-cycle quality assurance across functional, regression, exploratory, cross-device, and acceptance testing, so every release ships on evidence, not hope.",
    description:
      "QA & Software Testing is our foundational engagement: a human-first, process-backed layer of validation that covers the many different types of testing a modern product actually needs, functional correctness, regression safety, real-world usability, and coverage across the browsers, devices, and operating systems your users are really on. Automation is fast and API testing and performance testing go deep on their own layers (see those pages for the specialist detail), but this is the page where it all comes together as one coordinated testing practice for your product.",
    highlights: [
      "Functional, regression, and exploratory test execution",
      "Cross-browser and cross-device coverage",
      "Mobile app testing (iOS and Android)",
      "Accessibility and usability spot checks",
      "Detailed, evidence-backed bug reports",
      "Sprint-embedded or milestone-based engagement",
    ],
    outcomes: [
      "Find critical defects before customers do",
      "Ship with a clear, evidence-based readiness picture",
      "Reduce regression risk release after release",
      "Improve usability and accessibility before launch",
    ],
    deliverables: [
      "Test plans and structured test case suites",
      "Test execution and defect reports with evidence",
      "Regression and release readiness summaries",
      "Coverage matrix across devices, browsers, and OS versions",
    ],
    tools: ["BrowserStack", "Jira", "TestRail", "Figma", "Xray", "Zephyr"],
    idealFor: [
      "Product teams shipping regularly",
      "Customer-facing web and mobile apps",
      "Teams without an in-house QA function",
      "Complex, multi-step workflows",
    ],
    icon: ShieldCheck,
    relatedSlugs: ["automation-testing", "api-testing", "performance-testing"],
    visual: {
      checklist: [
        { label: "Login flow", status: "done" },
        { label: "Checkout", status: "done" },
        { label: "Checkout form - issue found", status: "flag" },
        { label: "Payment retry", status: "pending" },
      ],
    },
    stickyScroll: {
      eyebrow: "One page, every testing discipline",
      heading: "The types of testing built into every engagement",
      intro:
        "\"QA & Software Testing\" isn't one narrow activity, it's a coordinated set of disciplines we mix and match based on your product, risk areas, and release calendar.",
      items: [
        {
          icon: ShieldCheck,
          title: "Functional Testing",
          description:
            "Verifying that every feature behaves the way the requirements say it should, from individual components to complete user journeys.",
          bullets: [
            "Requirement-to-test-case traceability",
            "Positive, negative, and boundary scenarios",
            "Sprint-by-sprint feature validation",
          ],
        },
        {
          icon: Activity,
          title: "Regression Testing",
          description:
            "Confirming that new code hasn't quietly broken what already worked, run before every release and after every significant change.",
          bullets: [
            "Risk-based regression suite design",
            "Manual and automation-assisted execution",
            "Change-impact analysis for every release",
          ],
        },
        {
          icon: Compass,
          title: "Exploratory & Usability Testing",
          description:
            "Unscripted, experience-led testing that surfaces the awkward edge cases and friction points a checklist alone will never catch.",
          bullets: [
            "Session-based exploratory charters",
            "Heuristic usability evaluation",
            "First-impression and onboarding review",
          ],
        },
        {
          icon: Webhook,
          title: "Integration & System Testing",
          description:
            "Testing how your modules, services, and third-party integrations behave together, not just in isolation.",
          bullets: [
            "End-to-end workflow validation",
            "Data-flow and handoff verification",
            "Third-party integration checks",
          ],
        },
        {
          icon: Gauge,
          title: "Cross-Browser & Cross-Device Testing",
          description:
            "Validating your product on the real mix of browsers, screen sizes, and operating systems your actual users carry, not just the default simulator.",
          bullets: [
            "Real-device and emulator coverage",
            "Responsive layout verification",
            "OS and browser version matrices",
          ],
        },
        {
          icon: Bot,
          title: "Mobile App Testing",
          description:
            "Functional, UI, and device-compatibility testing for native and hybrid iOS and Android apps, including app store readiness checks.",
          bullets: [
            "Device and OS version matrix",
            "Push notification and permissions testing",
            "App Store / Play Store review readiness",
          ],
        },
        {
          icon: Lock,
          title: "Accessibility Testing",
          description:
            "Checking against WCAG guidelines so your product is usable by people relying on screen readers, keyboard navigation, and assistive technology.",
          bullets: [
            "WCAG 2.1/2.2 AA spot checks",
            "Keyboard and screen-reader walkthroughs",
            "Color contrast and semantic markup review",
          ],
        },
        {
          icon: Users,
          title: "User Acceptance Testing (UAT) Support",
          description:
            "Structuring and facilitating UAT so stakeholders can sign off on a release with confidence, not just a rushed final glance.",
          bullets: [
            "UAT scripts mapped to business scenarios",
            "Stakeholder session facilitation",
            "Sign-off documentation and audit trail",
          ],
        },
      ],
    },
    process: {
      eyebrow: "How we work",
      heading: "A testing rhythm that fits your release cadence",
      intro: "Whether you release weekly or quarterly, we plug into the cadence you already run.",
      steps: [
        {
          title: "Scope & risk mapping",
          description: "We review your product, architecture, and roadmap to identify where defects would hurt most.",
        },
        {
          title: "Test design",
          description: "Test cases, exploratory charters, and coverage matrices are built against real requirements.",
        },
        {
          title: "Execution & reporting",
          description: "We test in your sprint or milestone cadence, logging evidence-backed defects as we go.",
        },
        {
          title: "Release readiness",
          description: "A clear go/no-go summary, so the release decision is informed, not a guess.",
        },
      ],
    },
    capabilityGrid: {
      eyebrow: "Go Deeper: Specialized Testing",
      heading: "Test beyond the happy path",
      intro:
        "Real users don't always behave the way your test cases expect. We test the conditions that often expose the most costly defects.",
      columns: 3,
      items: [
        {
          icon: Ban,
          title: "Negative Testing",
          description:
            "Deliberately feeding invalid, malformed, or unexpected input to confirm the system fails safely instead of breaking silently.",
        },
        {
          icon: Crosshair,
          title: "Edge-Case Testing",
          description:
            "Testing the boundaries, zero values, maximum limits, empty states, so the conditions users hit least often don't become the ones that hurt most.",
        },
        {
          icon: Webhook,
          title: "API Testing",
          description:
            "Validating the contracts, payloads, and failure modes behind every integration your product depends on.",
          href: "/services/api-testing",
        },
        {
          icon: Gauge,
          title: "Performance Testing",
          description:
            "Confirming your product holds up under real load, not just a quiet demo environment.",
          href: "/services/performance-testing",
        },
        {
          icon: ShieldAlert,
          title: "Security Testing",
          description:
            "Probing for the vulnerabilities that put your data, users, and reputation at risk.",
          href: "/services/security-testing",
        },
        {
          icon: Database,
          title: "Data Validation",
          description:
            "Checking that data stays accurate, complete, and correctly formatted as it moves through your system.",
        },
        {
          icon: Puzzle,
          title: "Integration Testing",
          description:
            "Verifying your modules, services, and third-party connections behave correctly together, not just in isolation.",
        },
        {
          icon: BrainCircuit,
          title: "AI Testing",
          description:
            "Evaluating AI and LLM-powered features for accuracy, safety, and consistency, not just functional correctness.",
          href: "/services/ai-testing",
        },
      ],
    },
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
      {
        question: "How is this different from your API Testing or Performance Testing services?",
        answer:
          "This is the coordinated, full-product layer: functional, regression, exploratory, mobile, accessibility, and UAT support. API Testing and Performance Testing go significantly deeper on those two specific layers, and we often run them alongside this engagement rather than instead of it.",
      },
      {
        question: "Do you also cover accessibility and usability, or just functional bugs?",
        answer:
          "Both are part of the standard engagement. We flag usability friction and accessibility gaps alongside functional defects, not as a separate add-on.",
      },
    ],
  },
  {
    slug: "automation-testing",
    title: "Test Automation",
    category: "Full-Cycle Testing Services",
    eyebrow: "Scale regression with confidence",
    summary:
      "Resilient automation suites for web, API, and mobile that shrink regression cycles and keep your pipeline release-ready, built to be maintained, not thrown away.",
    description:
      "We build automation frameworks for web, API, and mobile workflows so your build pipeline stays fast, dependable, and release-ready. Every suite is architected for maintainability from day one, reusable page objects, sensible data separation, and CI/CD hooks, so it keeps paying off long after the first sprint instead of collapsing into a pile of flaky tests six months in.",
    highlights: [
      "Playwright and Cypress automation frameworks",
      "CI/CD integration for repeatable runs",
      "Reusable page object and test architecture",
      "Visual regression and cross-browser coverage",
      "Flaky test triage and stabilization",
      "Test data management strategy",
    ],
    outcomes: [
      "Shrink regression cycle time from days to hours",
      "Increase coverage without a proportional headcount increase",
      "Support continuous delivery with a trustworthy safety net",
      "Free manual testers to focus on exploratory and high-judgment work",
    ],
    deliverables: [
      "Automated regression suite with documented architecture",
      "CI/CD pipeline integration",
      "Flaky-test triage report and stabilization plan",
      "Maintenance handbook and support plan",
    ],
    tools: ["Playwright", "Cypress", "Selenium", "GitHub Actions", "Jenkins", "Appium"],
    idealFor: ["Frequent release cycles", "Fast-growing products", "Regression-heavy applications", "Teams scaling engineering"],
    icon: Bot,
    relatedSlugs: ["qa-software-testing", "api-testing", "devops"],
    visual: {
      checklist: [
        { label: "Regression suite", status: "done" },
        { label: "CI pipeline run", status: "done" },
        { label: "Cross-browser run - flaky result found", status: "flag" },
        { label: "Nightly build", status: "pending" },
      ],
    },
    capabilityGrid: {
      eyebrow: "Coverage",
      heading: "Automation across every layer of your stack",
      intro: "We automate where it actually pays off, not everything that can technically be scripted.",
      columns: 3,
      items: [
        {
          icon: Bot,
          title: "Web UI Automation",
          description: "End-to-end journeys automated with Playwright or Cypress, resilient to markup churn.",
        },
        {
          icon: Webhook,
          title: "API-Layer Automation",
          description: "Fast, stable automated checks at the API layer, well below the flakiness of the UI.",
        },
        {
          icon: Rocket,
          title: "Mobile Automation",
          description: "Appium-based automation across real Android and iOS devices for native and hybrid apps.",
        },
        {
          icon: Gauge,
          title: "Visual Regression",
          description: "Pixel-level snapshot comparisons that catch unintended UI drift before users do.",
        },
        {
          icon: Workflow,
          title: "CI/CD Integration",
          description: "Suites wired into your pipeline with parallelized runs and clear pass/fail gating.",
        },
        {
          icon: Compass,
          title: "Cross-Browser Grids",
          description: "The same suite run across browser and OS combinations that match your real traffic.",
        },
      ],
    },
    comparison: {
      eyebrow: "Why automate",
      heading: "Manual regression vs. an automated safety net",
      rows: [
        { label: "Regression cycle time", without: "Days of repetitive manual re-testing per release", with: "Hours, run automatically on every build" },
        { label: "Coverage consistency", without: "Varies by who's testing and how much time is left", with: "The same checks, run the same way, every time" },
        { label: "Release confidence", without: "Gut feel based on spot checks", with: "A repeatable, evidence-backed pass/fail signal" },
        { label: "Team focus", without: "Testers stuck re-running the same scripts", with: "Testers freed up for exploratory, high-judgment work" },
      ],
    },
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
      {
        question: "We already have some automation. Can you build on it?",
        answer:
          "Usually, yes. We start by assessing what's there, what's worth keeping and what's flaky and worth rebuilding, then extend from a stable foundation rather than starting over.",
      },
      {
        question: "What if our team doesn't have automation experience?",
        answer:
          "We can pair this with our Tools Proficiency Training so your team builds real capability alongside the suite we deliver, not just a black box to maintain.",
      },
    ],
  },
  {
    slug: "api-testing",
    title: "API Testing",
    category: "Full-Cycle Testing Services",
    eyebrow: "Reliable integrations",
    summary:
      "Contract, payload, security, and resilience testing across every API and integration layer, including the failure modes that only show up when something else breaks first.",
    description:
      "From contract checks to end-to-end payload validation, we help teams ensure every integration layer behaves the way it should under real-world conditions. That includes the happy path, but also authentication edge cases, malformed input, rate limits, timeouts, and the failure modes of third-party services you don't control.",
    highlights: [
      "Schema and contract validation (OpenAPI/Swagger)",
      "Authentication and authorization checks",
      "Negative and edge-case testing",
      "Rate limiting and timeout behavior validation",
      "Webhook and event-driven API testing",
      "Service virtualization and mocking",
    ],
    outcomes: [
      "Reduce integration failures in production",
      "Improve service reliability across your ecosystem",
      "Make releases safer when third-party services change",
      "Catch contract-breaking changes before they ship",
    ],
    deliverables: [
      "API test suites (functional, negative, security)",
      "Contract validation reports against OpenAPI specs",
      "Error-handling and resilience test results",
      "Integration assurance playbook",
    ],
    tools: ["Postman", "Swagger/OpenAPI", "REST Assured", "Newman", "Pact", "WireMock"],
    idealFor: ["Microservice architectures", "Platform and API-first teams", "Third-party integrations", "Partner and B2B APIs"],
    icon: Webhook,
    relatedSlugs: ["automation-testing", "performance-testing", "security-testing"],
    visual: {
      checklist: [
        { label: "Auth headers", status: "done" },
        { label: "Response schema", status: "done" },
        { label: "Webhook retry - timeout found", status: "flag" },
        { label: "Rate limit check", status: "pending" },
      ],
    },
    capabilityGrid: {
      eyebrow: "Depth of coverage",
      heading: "Testing every layer of an API contract",
      columns: 3,
      items: [
        {
          icon: ShieldCheck,
          title: "Contract & Schema Validation",
          description: "Requests and responses checked against your OpenAPI/Swagger spec so contracts never drift silently.",
        },
        {
          icon: Lock,
          title: "Auth & Permission Testing",
          description: "Token expiry, scopes, and permission boundaries tested, not just the logged-in happy path.",
        },
        {
          icon: ShieldAlert,
          title: "Negative & Edge Cases",
          description: "Malformed payloads, missing fields, and invalid types, deliberately thrown at every endpoint.",
        },
        {
          icon: Gauge,
          title: "Performance Under Load",
          description: "Response time and stability checks under concurrent request volume, run alongside our Performance Testing service.",
        },
        {
          icon: Webhook,
          title: "Webhook & Event Testing",
          description: "Asynchronous, event-driven integrations validated for delivery, ordering, and retry behavior.",
        },
        {
          icon: Compass,
          title: "Service Virtualization",
          description: "Mocked third-party dependencies so we can test failure modes you can't safely trigger in production.",
        },
      ],
    },
    process: {
      eyebrow: "Workflow",
      heading: "From spec review to CI-integrated coverage",
      steps: [
        { title: "Contract review", description: "We start from your OpenAPI spec or, if there isn't one, document the actual contract as we test." },
        { title: "Test design", description: "Functional, negative, auth, and resilience cases mapped to every endpoint." },
        { title: "Execution", description: "Automated and exploratory runs against staging, and safely mocked third-party dependencies." },
        { title: "CI integration", description: "Suites wired into your pipeline so contract regressions are caught on every build." },
      ],
    },
    faqs: [
      {
        question: "Do you test authentication and security edge cases?",
        answer:
          "Yes, token expiry, permission boundaries, and malformed or malicious payloads are all part of a standard API testing engagement. For deeper penetration-style coverage, pair this with our Security Testing service.",
      },
      {
        question: "Can you validate third-party API integrations?",
        answer:
          "Absolutely. We test how your system handles both the happy path and the failure modes of any external service you depend on, using service virtualization where we can't safely trigger a failure on the real provider.",
      },
      {
        question: "Do you test integrations with third-party providers we don't control?",
        answer:
          "Yes. We test how your system behaves against real third-party responses, including their failure modes, timeouts, and rate limits, not just the happy path.",
      },
    ],
  },
  {
    slug: "performance-testing",
    title: "Performance Testing",
    category: "Full-Cycle Testing Services",
    eyebrow: "Speed under pressure",
    summary:
      "Load, stress, spike, and endurance testing that reveals bottlenecks before they become user-visible incidents during launches or peak traffic.",
    description:
      "We test scalability, response time, concurrency, and stability so your product performs consistently under real load conditions, not just the calm traffic of a demo environment. Whether you're preparing for a product launch, a marketing campaign, or seasonal peak demand, we model the load that actually matters to your business and pressure-test before it counts.",
    highlights: [
      "Load, stress, spike, and soak testing",
      "Performance bottleneck analysis",
      "Benchmarking and trend reporting",
      "Scalability and capacity planning support",
      "Database and third-party dependency profiling",
      "Safe testing windows that protect production and shared environments",
    ],
    outcomes: [
      "Protect user experience at scale",
      "Prevent rollout failures during high-traffic events",
      "Improve infrastructure and capacity decisions",
      "Establish performance baselines you can track over time",
    ],
    deliverables: [
      "Performance test plans and scripts",
      "Load test execution reports with benchmarks",
      "Bottleneck analysis and optimization recommendations",
      "Capacity planning guidance",
    ],
    tools: ["k6", "JMeter", "Grafana", "Locust", "Gatling", "New Relic"],
    idealFor: ["High-traffic products", "E-commerce platforms", "SaaS platforms", "Products preparing for a launch or campaign"],
    icon: Gauge,
    relatedSlugs: ["api-testing", "automation-testing", "devops"],
    visual: {
      checklist: [
        { label: "Load test", status: "done" },
        { label: "Stress test", status: "done" },
        { label: "Response time - threshold exceeded", status: "flag" },
        { label: "Scalability check", status: "pending" },
      ],
    },
    capabilityGrid: {
      eyebrow: "Testing types",
      heading: "The performance tests behind every engagement",
      intro: "Different risks call for different load profiles. We pick the mix that matches yours.",
      columns: 3,
      items: [
        {
          icon: Gauge,
          title: "Load Testing",
          description: "How your system behaves under expected, everyday traffic volumes.",
        },
        {
          icon: ShieldAlert,
          title: "Stress Testing",
          description: "Pushing well past expected load to find the breaking point and how gracefully it fails.",
        },
        {
          icon: Activity,
          title: "Spike Testing",
          description: "Sudden, sharp traffic surges, the kind a viral moment or flash sale actually produces.",
        },
        {
          icon: Workflow,
          title: "Soak / Endurance Testing",
          description: "Sustained load over hours or days to catch memory leaks and slow degradation.",
        },
        {
          icon: Compass,
          title: "Scalability Testing",
          description: "How performance holds as you add users, data, or infrastructure, and where it stops holding.",
        },
        {
          icon: Webhook,
          title: "Dependency Profiling",
          description: "Isolating whether bottlenecks originate in your app, your database, or a third-party service.",
        },
      ],
    },
    process: {
      eyebrow: "Methodology",
      heading: "From traffic modeling to optimization",
      steps: [
        { title: "Model the load", description: "We base test profiles on your real or projected traffic, everyday peaks and worst-case scenarios." },
        { title: "Build & run scripts", description: "Scripts are built for your specific user flows, not generic templates." },
        { title: "Analyze bottlenecks", description: "We isolate whether slowdowns come from application code, database, or infrastructure." },
        { title: "Recommend & retest", description: "Optimization recommendations, then a retest to confirm the fix actually holds under load." },
      ],
    },
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
      {
        question: "We have a big traffic event coming up. Can you help us prepare?",
        answer:
          "Yes, this is exactly the kind of engagement we're built for. We model expected load ahead of a launch, campaign, or seasonal peak and stress-test before it matters.",
      },
    ],
  },
  {
    slug: "ai-testing",
    title: "AI Testing",
    category: "Full-Cycle Testing Services",
    eyebrow: "Quality for AI-powered products",
    summary:
      "Specialized testing for AI/ML features, LLMs, and chatbots, covering accuracy, consistency, safety, bias, and regression in ways traditional test scripts can't.",
    description:
      "AI-powered features don't fail like traditional software. A prompt that works perfectly today can produce a wildly different answer tomorrow, a model can be subtly biased in ways no functional test catches, and \"correct\" often isn't binary. Our AI Testing service brings structured, repeatable evaluation to AI/ML-powered applications, LLM and chatbot integrations, and the prompts, pipelines, and APIs behind them, so you can ship AI features with the same confidence you expect from the rest of your product.",
    highlights: [
      "LLM and chatbot conversation testing",
      "Prompt and response validation",
      "Accuracy, consistency, and hallucination checks",
      "Bias, fairness, and AI safety evaluation",
      "Regression testing for evolving models and prompts",
      "AI API and integration testing",
    ],
    outcomes: [
      "Catch inaccurate, unsafe, or off-brand AI responses before users do",
      "Build a repeatable evaluation process for a fast-moving model landscape",
      "Reduce the risk of biased or harmful AI outputs reaching production",
      "Keep AI feature quality stable across model and prompt updates",
    ],
    deliverables: [
      "AI evaluation test suite and scoring rubric",
      "Bias, fairness, and safety audit report",
      "Regression harness for prompts and model versions",
      "AI API test coverage and reliability report",
    ],
    tools: ["Promptfoo", "LangSmith", "Ragas", "OpenAI Evals", "Postman", "Custom evaluation harnesses"],
    idealFor: ["AI/ML product teams", "Chatbot and virtual assistant builders", "Teams shipping LLM-powered features", "Regulated industries adopting AI"],
    icon: BrainCircuit,
    relatedSlugs: ["qa-software-testing", "automation-testing", "security-testing"],
    visual: {
      checklist: [
        { label: "Prompt accuracy", status: "done" },
        { label: "Bias & fairness scan", status: "done" },
        { label: "Response consistency - drift found", status: "flag" },
        { label: "Regression harness", status: "pending" },
      ],
    },
    stickyScroll: {
      eyebrow: "What we test",
      heading: "AI quality assurance, end to end",
      intro:
        "AI features fail in different ways than traditional software. Here's how we cover the full surface area, and there's more we tailor per engagement.",
      items: [
        {
          icon: BrainCircuit,
          title: "AI/ML-Powered Application Testing",
          description:
            "Functional testing for features built on machine learning models, recommendation engines, classifiers, generative pipelines, treating the model as a testable component of the system, not a black box.",
          bullets: ["Model input/output validation", "Integration testing across the AI pipeline", "Fallback and error-state behavior"],
        },
        {
          icon: Users,
          title: "LLM / Chatbot Testing",
          description:
            "Conversation-flow testing for chatbots and virtual assistants, covering intent recognition, context retention, multi-turn conversations, and graceful handling of off-topic or adversarial input.",
          bullets: ["Multi-turn context retention checks", "Intent recognition accuracy", "Graceful failure and handoff paths"],
        },
        {
          icon: Compass,
          title: "Prompt & Response Validation",
          description:
            "Structured testing of prompts against a broad matrix of inputs to confirm responses stay accurate, relevant, and on-brand as prompts, models, or context windows change.",
          bullets: ["Prompt regression matrices", "Format and structure validation", "Golden-answer comparison sets"],
        },
        {
          icon: Activity,
          title: "Accuracy & Consistency Testing",
          description:
            "Running the same or similar inputs repeatedly to measure how stable and reliable outputs are, and catching hallucinations before they reach a user.",
          bullets: ["Repeatability and variance scoring", "Factual accuracy spot-checks", "Hallucination detection scenarios"],
        },
        {
          icon: ShieldAlert,
          title: "AI Safety & Edge-Case Testing",
          description:
            "Deliberately probing with adversarial, ambiguous, and out-of-scope inputs to see how the system behaves at its edges, not just on well-formed happy-path prompts.",
          bullets: ["Adversarial and jailbreak-style prompts", "Ambiguous and out-of-scope inputs", "Guardrail and refusal-behavior checks"],
        },
        {
          icon: Bot,
          title: "Regression Testing for AI Features",
          description:
            "A repeatable evaluation harness that reruns your test matrix every time a model, prompt, or fine-tune changes, so quality doesn't quietly drift over time.",
          bullets: ["Automated re-scoring on every change", "Baseline comparison across versions", "CI-integrated evaluation pipelines"],
        },
        {
          icon: ShieldCheck,
          title: "Bias & Fairness Testing",
          description:
            "Structured evaluation across demographic and contextual variations to surface skewed, stereotyped, or inequitable outputs before they reach users.",
          bullets: ["Demographic variation testing", "Stereotype and skew detection", "Fairness scoring against defined criteria"],
        },
        {
          icon: Webhook,
          title: "AI API Testing",
          description:
            "Reliability, latency, cost, and error-handling testing for the APIs powering your AI features, including third-party model providers.",
          bullets: ["Rate limit and timeout behavior", "Latency and cost monitoring", "Fallback provider testing"],
        },
        {
          icon: FlaskConical,
          title: "...and Beyond",
          description:
            "Multimodal (voice, image, video) evaluation, agentic workflow testing, retrieval-augmented generation (RAG) accuracy, and other AI testing needs scoped to your specific product.",
          bullets: ["Multimodal input/output evaluation", "Agentic and tool-use workflow testing", "RAG pipeline accuracy checks"],
        },
      ],
    },
    process: {
      eyebrow: "How we evaluate AI features",
      heading: "A repeatable process for a fast-moving surface",
      intro: "AI systems don't stay still, so the evaluation process is built to run again and again, not just once before launch.",
      steps: [
        { title: "Baseline & scope", description: "We define what \"good\" looks like for your feature, accuracy thresholds, tone, safety boundaries." },
        { title: "Scenario & prompt design", description: "Test matrices built from real user intents, edge cases, and adversarial inputs." },
        { title: "Automated + human evaluation", description: "Automated scoring for scale, paired with human review for nuance and judgment calls." },
        { title: "Safety & bias audit", description: "A dedicated pass for harmful, biased, or unsafe outputs against your defined criteria." },
        { title: "Regression harness", description: "The full suite is wired to rerun automatically whenever a model, prompt, or fine-tune changes." },
      ],
    },
    faqs: [
      {
        question: "Our AI feature uses a third-party model (OpenAI, Anthropic, etc). Can you still test it?",
        answer:
          "Yes. Most AI testing engagements are exactly this, evaluating how your product uses a third-party model: your prompts, your guardrails, your integration, and the end-to-end user experience, rather than testing the model provider's infrastructure itself.",
      },
      {
        question: "How is this different from traditional QA?",
        answer:
          "Traditional testing checks for one correct output. AI features often have a range of acceptable outputs, and results can vary between runs. We use scoring rubrics, statistical evaluation, and human review instead of simple pass/fail assertions.",
      },
      {
        question: "Can you test for bias and safety, not just functionality?",
        answer:
          "Yes, bias, fairness, and AI safety evaluation is a core part of this service, not an optional add-on. We test with structured, adversarial, and demographically varied inputs to surface issues before they reach production.",
      },
      {
        question: "What happens when we update our model or prompts?",
        answer:
          "We build a regression harness specifically so this isn't a one-time engagement. Your evaluation suite reruns automatically against every model or prompt change, flagging quality drift before it ships.",
      },
      {
        question: "Do you test chatbots and voice assistants too?",
        answer:
          "Yes. Conversational AI testing, chatbots, virtual assistants, and voice interfaces, covers multi-turn context handling, intent recognition, and graceful fallback behavior, in addition to the accuracy checks we run on any AI feature.",
      },
    ],
  },
  {
    slug: "security-testing",
    title: "Security Testing",
    category: "Full-Cycle Testing Services",
    eyebrow: "Find the gaps before attackers do",
    summary:
      "Vulnerability assessments, penetration testing, and secure code review that protect your systems, data, and users, mapped against the OWASP Top 10 and beyond.",
    description:
      "Security issues are the most expensive defects to find late. We test your applications, APIs, and infrastructure the way an attacker would, systematically probing for the vulnerabilities that put your data, your users, and your reputation at risk, then hand you a clear, prioritized path to fixing them, not just a wall of raw scanner output.",
    highlights: [
      "OWASP Top 10 vulnerability coverage",
      "Application and API penetration testing",
      "Authentication and session security testing",
      "Secure code and configuration review",
      "Cloud and infrastructure security checks",
      "Clear, prioritized remediation guidance",
    ],
    outcomes: [
      "Close vulnerabilities before they're exploited",
      "Reduce risk of data breaches and downtime",
      "Build customer and partner trust with demonstrable due diligence",
      "Meet security expectations in vendor and compliance reviews",
    ],
    deliverables: [
      "Vulnerability assessment report, ranked by severity",
      "Penetration test findings with reproduction steps",
      "Secure code / configuration review notes",
      "Prioritized remediation roadmap",
    ],
    tools: ["OWASP ZAP", "Burp Suite", "Nmap", "Nessus", "Postman", "Manual exploitation techniques"],
    idealFor: ["Apps handling sensitive user data", "Fintech and healthtech products", "Pre-launch security reviews", "Vendor security compliance"],
    icon: ShieldAlert,
    relatedSlugs: ["api-testing", "ai-testing", "devops"],
    visual: {
      checklist: [
        { label: "Auth & session checks", status: "done" },
        { label: "OWASP Top 10 scan", status: "done" },
        { label: "API endpoint - vulnerability found", status: "flag" },
        { label: "Penetration test", status: "pending" },
      ],
    },
    capabilityGrid: {
      eyebrow: "Coverage",
      heading: "Where we look for risk",
      columns: 3,
      items: [
        {
          icon: ShieldAlert,
          title: "OWASP Top 10 Coverage",
          description: "Injection, broken access control, security misconfiguration, and the other most common, most exploited risk categories.",
        },
        {
          icon: Lock,
          title: "Auth & Session Security",
          description: "Session handling, token security, password policy, and multi-factor flows tested for weak points.",
        },
        {
          icon: Webhook,
          title: "API Security Testing",
          description: "Broken object-level authorization, excessive data exposure, and other API-specific attack surfaces.",
        },
        {
          icon: Compass,
          title: "Secure Code Review",
          description: "Manual review of security-sensitive code paths, not just automated scanner output.",
        },
        {
          icon: Workflow,
          title: "Cloud & Infra Configuration",
          description: "Misconfigured storage, permissions, and network rules checked against security best practice.",
        },
        {
          icon: Activity,
          title: "Penetration Testing",
          description: "Manual, attacker-mindset testing that goes beyond what automated scanners alone can find.",
        },
      ],
    },
    comparison: {
      eyebrow: "Why it matters",
      heading: "Reactive incident response vs. proactive testing",
      rows: [
        { label: "When issues are found", without: "After an incident, breach, or customer report", with: "Before release, on your terms" },
        { label: "Cost of a fix", without: "High, incident response, disclosure, remediation under pressure", with: "Low, fixed in normal development flow" },
        { label: "Customer trust", without: "Damaged by a public incident", with: "Reinforced by demonstrable due diligence" },
        { label: "Compliance readiness", without: "Scrambling to answer vendor security questionnaires", with: "Evidence-backed answers, ready on demand" },
      ],
    },
    faqs: [
      {
        question: "Is this a penetration test or a vulnerability scan?",
        answer:
          "Both, combined. Automated scanning gives broad coverage quickly; manual, attacker-mindset penetration testing then digs into the areas most likely to hide real, exploitable issues that scanners alone miss.",
      },
      {
        question: "Will testing disrupt our production environment?",
        answer:
          "No. We scope and schedule testing in staging or an agreed environment with clear rules of engagement, so testing never risks live traffic or customer data.",
      },
      {
        question: "Do you provide a report we can share with customers or auditors?",
        answer:
          "Yes. You get a clear, prioritized report suitable for internal remediation planning and for demonstrating due diligence to customers, partners, or auditors.",
      },
    ],
  },
  {
    slug: "qa-consulting",
    title: "QA Consulting",
    category: "Full-Cycle Testing Services",
    eyebrow: "Turn quality into a repeatable advantage",
    summary:
      "Strategy, process design, release readiness, and test management advisory that helps you plan, structure, and scale quality with confidence, without adding bureaucracy nobody asked for.",
    description:
      "Not every quality problem is solved by more testing, some need better structure. QA Consulting is where we step back and help you design the operating model: the strategy, the process, the release gates, and the reporting that make quality a repeatable advantage instead of a last-minute scramble. We work alongside your existing team, so the plan is one they can actually execute, not a binder that sits on a shelf.",
    highlights: [
      "Quality maturity assessment and roadmap",
      "Test strategy and coverage planning",
      "Release readiness gate design",
      "Defect lifecycle and process governance",
      "Test management, tooling, and reporting setup",
      "Stakeholder and leadership workshops",
    ],
    outcomes: [
      "Create better, evidence-backed release decisions",
      "Align QA with actual business goals and risk appetite",
      "Reduce wasted effort, rework, and process friction",
      "Give leadership real visibility into delivery health",
    ],
    deliverables: [
      "QA strategy document and roadmap",
      "Process maps and governance templates",
      "Release readiness review framework",
      "Test management dashboards and reporting templates",
    ],
    tools: ["Risk-based testing frameworks", "Test pyramid modelling", "Jira / Azure DevOps workflows", "TestRail / Xray / Zephyr"],
    idealFor: ["Leadership teams", "Maturing engineering organizations", "Teams without a defined QA process", "Transformation programs"],
    icon: Compass,
    relatedSlugs: ["staff-augmentation", "testing-as-a-service", "qa-software-testing"],
    visual: {
      checklist: [
        { label: "Strategy review", status: "done" },
        { label: "Process audit", status: "done" },
        { label: "Release gate - risk flagged", status: "flag" },
        { label: "Reporting setup", status: "pending" },
      ],
    },
    capabilityGrid: {
      eyebrow: "Four pillars",
      heading: "What a QA Consulting engagement covers",
      intro: "Most engagements draw from all four pillars; some focus on just one. We scope it to what you actually need.",
      columns: 2,
      items: [
        {
          icon: Compass,
          title: "QA Strategy & Roadmapping",
          description:
            "Defining the right testing approach, tooling mix, and operating model for your product, team maturity, and delivery model, so quality engineering becomes an advantage rather than a bottleneck.",
        },
        {
          icon: Workflow,
          title: "Process & Governance Setup",
          description:
            "Designing practical, repeatable workflows for defect management, test governance, and team handoffs, with clear entry and exit criteria at every stage.",
        },
        {
          icon: ShieldCheck,
          title: "Release Readiness Reviews",
          description:
            "Focused, evidence-based checks that evaluate whether a release is truly ready, and exactly where to focus effort before go-live.",
        },
        {
          icon: Activity,
          title: "Test Management & Reporting",
          description:
            "Test planning, execution oversight, and quality dashboards so stakeholders always know where risk sits, without chasing updates across five tools.",
        },
      ],
    },
    process: {
      eyebrow: "Engagement model",
      heading: "From assessment to a plan your team can run",
      steps: [
        { title: "Assess", description: "A structured review of your current QA maturity, tooling, and pain points." },
        { title: "Design", description: "A strategy, process, or reporting model shaped around your team and delivery model." },
        { title: "Implement", description: "Hands-on support rolling changes in incrementally, not a disruptive reset." },
        { title: "Coach & handover", description: "Your team owns the new operating model with our support tapering as confidence builds." },
      ],
    },
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
      {
        question: "Can this fit into a fixed release calendar?",
        answer:
          "Yes. We build release readiness reviews and reporting cadences around your existing release calendar, weekly, bi-weekly, or quarterly, rather than asking you to change it.",
      },
      {
        question: "Do you work with our existing QA team or replace them?",
        answer:
          "We work alongside your existing team. The goal is a strategy and process your people can execute, not a plan that sidelines them.",
      },
    ],
  },
  {
    slug: "testing-as-a-service",
    title: "Testing as a Service (TaaS)",
    category: "Full-Cycle Testing Services",
    eyebrow: "QA capacity, on demand",
    summary:
      "Flexible, on-demand testing capacity you can scale up or down as your project needs change, without the overhead of building an in-house QA team from scratch.",
    description:
      "Testing as a Service gives you access to a full QA capability, manual, automation, API, performance, security, without hiring, onboarding, and managing an internal team. Engage us for a single release, a defined sprint cadence, or an ongoing subscription, and scale capacity up for a big launch or down between releases, paying for testing as a flexible service rather than a fixed cost.",
    highlights: [
      "Flexible, subscription or per-engagement pricing",
      "Full QA capability without in-house hiring",
      "Scale capacity up or down as needs change",
      "Access to manual, automation, API, and performance specialists",
      "Fast onboarding, typically within one to two weeks",
      "Transparent reporting and defect tracking",
    ],
    outcomes: [
      "Get QA capacity exactly when you need it, not a fixed year-round headcount",
      "Avoid the cost and time of building an in-house QA function from scratch",
      "Keep testing quality consistent across every release, big or small",
      "Redirect saved overhead toward core product development",
    ],
    deliverables: [
      "Defined engagement scope and SLAs",
      "Recurring test execution and defect reports",
      "Release-by-release quality summaries",
      "A single point of contact for coordination",
    ],
    tools: ["Jira / Azure DevOps", "TestRail / Xray", "Playwright / Selenium", "Postman", "k6 / JMeter"],
    idealFor: ["Startups without an in-house QA team", "Agencies and product studios", "Teams with fluctuating release volume", "Companies scaling testing without scaling headcount"],
    icon: FlaskConical,
    relatedSlugs: ["staff-augmentation", "qa-consulting", "qa-software-testing"],
    visual: {
      checklist: [
        { label: "Sprint coverage", status: "done" },
        { label: "Release testing", status: "done" },
        { label: "Regression cycle - defect found", status: "flag" },
        { label: "Capacity scaling", status: "pending" },
      ],
    },
    comparison: {
      eyebrow: "Engagement model",
      heading: "In-house hiring vs. Testing as a Service",
      withoutLabel: "Building in-house",
      withLabel: "Testing as a Service",
      rows: [
        { label: "Time to start testing", without: "Weeks to months of hiring and onboarding", with: "Typically one to two weeks" },
        { label: "Cost during quiet periods", without: "Fixed salaries, regardless of workload", with: "Scale down when there's less to test" },
        { label: "Specialist coverage", without: "Limited to whoever you hired", with: "Access to automation, API, performance, and security specialists" },
        { label: "Hiring risk", without: "Recruitment, onboarding, and retention overhead", with: "None, capacity flexes with your contract" },
      ],
    },
    capabilityGrid: {
      eyebrow: "Engagement models",
      heading: "Choose the model that fits how you ship",
      columns: 3,
      items: [
        {
          icon: FlaskConical,
          title: "Pay-as-you-go Sprints",
          description: "Engage us for specific sprints or releases, scale up for a big push and pause in between.",
        },
        {
          icon: Users,
          title: "Dedicated QA Pod",
          description: "A consistent team embedded in your delivery cadence for ongoing, predictable coverage.",
        },
        {
          icon: Activity,
          title: "Release-Based Bursts",
          description: "Concentrated testing capacity around specific launches, campaigns, or major releases.",
        },
        {
          icon: Workflow,
          title: "Ongoing Regression Subscription",
          description: "A standing regression suite we maintain and run continuously between releases.",
        },
      ],
    },
    faqs: [
      {
        question: "How is this different from Staff Augmentation?",
        answer:
          "Staff Augmentation embeds named individuals into your team and processes for extended periods. Testing as a Service is outcome-based, you get tested software and reports; we manage the team, tooling, and process behind it.",
      },
      {
        question: "Can we scale the engagement up or down?",
        answer:
          "Yes, that flexibility is the point. We adjust capacity as your release calendar, budget, or delivery pressure changes, without a lengthy re-contracting process.",
      },
      {
        question: "What's included, just manual testing or also automation and performance?",
        answer:
          "It depends on your scope. TaaS engagements can include manual, automation, API, performance, and security testing, we structure the mix around what your product actually needs.",
      },
    ],
  },
  {
    slug: "staff-augmentation",
    title: "Staff Augmentation",
    category: "Full-Cycle Testing Services",
    eyebrow: "Extend your team without losing momentum",
    summary:
      "Experienced QA professionals who embed directly into your team, your standups, your sprints, your tools, and integrate seamlessly into how you already work.",
    description:
      "Sometimes the fastest way to increase delivery capacity isn't a new process, it's more skilled hands. Staff Augmentation places experienced, vetted QA engineers directly into your team: in your standups, your sprint planning, your Slack channels, not sitting outside them as an external vendor. You get the capability of a full-time hire with the flexibility to scale up or down as your roadmap changes.",
    highlights: [
      "Vetted, experienced QA engineers across specializations",
      "Embedded in your standups, sprints, and tools",
      "Flexible scaling as your roadmap changes",
      "Manual, automation, performance, and security specialists available",
      "Fast onboarding, typically one to two weeks",
      "Direct collaboration with your existing team",
    ],
    outcomes: [
      "Increase delivery capacity without a lengthy hiring process",
      "Improve quality ownership within your existing team structure",
      "Reduce hiring, onboarding, and retention risk",
      "Access specialist skills you don't need full-time in-house",
    ],
    deliverables: [
      "Role scoping and candidate shortlist",
      "Structured onboarding plan",
      "Ongoing performance and progress reporting",
      "Flexible ramp-up or ramp-down as needs change",
    ],
    tools: ["Your existing stack and workflow", "Jira / Azure DevOps / Linear", "Slack / Teams integration", "TestRail / Xray / Zephyr"],
    idealFor: ["Teams scaling engineering fast", "Resource-constrained QA functions", "Complex, high-stakes product delivery", "Backfilling specialist gaps"],
    icon: Users,
    relatedSlugs: ["qa-consulting", "testing-as-a-service", "devops"],
    visual: {
      checklist: [
        { label: "Role scoping", status: "done" },
        { label: "Team onboarding", status: "done" },
        { label: "Sprint handoff - coverage gap found", status: "flag" },
        { label: "Capacity flex", status: "pending" },
      ],
    },
    process: {
      eyebrow: "How it works",
      heading: "From scoping to embedded delivery",
      steps: [
        { title: "Scope the role", description: "We define the skill mix, seniority, and domain context your team actually needs." },
        { title: "Shortlist & match", description: "Vetted candidates matched to your stack, product domain, and team culture." },
        { title: "Trial & onboarding", description: "A structured ramp-up so the engineer is productive fast, not learning in isolation." },
        { title: "Embedded delivery", description: "Full participation in your standups, sprints, and tools, as part of the team." },
        { title: "Flex as needed", description: "Scale the engagement up or down as your roadmap, budget, or delivery pressure changes." },
      ],
    },
    capabilityGrid: {
      eyebrow: "Roles available",
      heading: "Specialists across the QA discipline",
      columns: 3,
      items: [
        { icon: ShieldCheck, title: "Manual QA Engineer", description: "Hands-on functional, regression, and exploratory testing." },
        { icon: Bot, title: "Automation Engineer / SDET", description: "Framework design, automation build-out, and CI integration." },
        { icon: Gauge, title: "Performance Engineer", description: "Load, stress, and scalability testing specialists." },
        { icon: ShieldAlert, title: "Security Tester", description: "Application and API security testing expertise." },
        { icon: Compass, title: "QA Lead / Manager", description: "Process ownership, planning, and team coordination." },
        { icon: BrainCircuit, title: "AI Testing Specialist", description: "Evaluation expertise for AI/ML and LLM-powered features." },
      ],
    },
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
      {
        question: "Do augmented engineers work in our tools, or their own?",
        answer:
          "Yours. They work inside your existing Jira/Azure DevOps board, your test management tool, and your communication channels, as part of the team, not a separate silo.",
      },
    ],
  },
  {
    slug: "devops",
    title: "DevOps as a Service",
    category: "Full-Cycle Testing Services",
    eyebrow: "Ship faster, without shipping blind",
    summary:
      "CI/CD pipeline design, release automation, and quality gates that integrate testing directly into your delivery pipeline for faster, safer releases.",
    description:
      "Quality and delivery speed aren't opposites when the pipeline is built right. Our DevOps engagements design and implement CI/CD pipelines, automated quality gates, and release processes that let you ship faster, with testing built into the pipeline itself rather than bolted on at the end. The result is a delivery process where speed and confidence increase together, not at each other's expense.",
    highlights: [
      "CI/CD pipeline design and implementation",
      "Automated quality gates in the delivery pipeline",
      "Infrastructure as Code (IaC) setup",
      "Containerization and orchestration support",
      "Release automation and rollback strategies",
      "Monitoring and observability integration",
    ],
    outcomes: [
      "Reduce release cycle time without cutting corners on quality",
      "Catch issues earlier, in the pipeline, not in production",
      "Increase deployment frequency with lower risk per release",
      "Give teams fast, reliable feedback on every change",
    ],
    deliverables: [
      "CI/CD pipeline configuration",
      "Automated quality gate setup (tests, coverage, security scans)",
      "Infrastructure as Code templates",
      "Release and rollback runbooks",
    ],
    tools: ["GitHub Actions", "Jenkins", "Docker", "Kubernetes", "Terraform", "Grafana / Prometheus"],
    idealFor: ["Teams releasing infrequently due to process friction", "Engineering orgs scaling delivery", "Products needing safer, faster releases", "Teams modernizing legacy release processes"],
    icon: Workflow,
    relatedSlugs: ["automation-testing", "security-testing", "performance-testing"],
    visual: {
      checklist: [
        { label: "Pipeline build", status: "done" },
        { label: "Quality gate", status: "done" },
        { label: "Deploy check - rollback triggered", status: "flag" },
        { label: "Monitoring setup", status: "pending" },
      ],
    },
    capabilityGrid: {
      eyebrow: "What we build",
      heading: "Pipelines built for speed and confidence",
      columns: 3,
      items: [
        { icon: Workflow, title: "CI/CD Pipeline Design", description: "Build, test, and deploy pipelines tailored to your stack and team workflow." },
        { icon: ShieldCheck, title: "Automated Quality Gates", description: "Tests, coverage thresholds, and security scans wired in as pass/fail gates, not optional checks." },
        { icon: Compass, title: "Infrastructure as Code", description: "Reproducible, version-controlled infrastructure instead of manual configuration drift." },
        { icon: Bot, title: "Containerization & Orchestration", description: "Docker and Kubernetes setups that keep environments consistent from dev to production." },
        { icon: Activity, title: "Release Automation", description: "Automated deployments with clear rollback strategies when something goes wrong." },
        { icon: Gauge, title: "Monitoring & Observability", description: "Visibility into system health so issues are caught in minutes, not discovered by users." },
      ],
    },
    comparison: {
      eyebrow: "Impact",
      heading: "Manual releases vs. a DevOps-enabled pipeline",
      rows: [
        { label: "Release frequency", without: "Infrequent, high-effort release events", with: "Frequent, low-risk, automated releases" },
        { label: "Where issues are caught", without: "In production, after users hit them", with: "In the pipeline, before deployment" },
        { label: "Rollback readiness", without: "Manual, stressful, and slow", with: "Automated and rehearsed" },
        { label: "Team feedback loop", without: "Hours or days to know if a change is safe", with: "Minutes, on every commit" },
      ],
    },
    faqs: [
      {
        question: "Do you replace our existing DevOps/platform team, or work alongside them?",
        answer:
          "Alongside. We typically design and implement the pipeline and quality-gate architecture, then hand it over with documentation your team can extend and maintain.",
      },
      {
        question: "Can you integrate our existing test automation into the pipeline?",
        answer:
          "Yes, this is one of the most common starting points. We wire your existing (or newly built) automation suites in as quality gates rather than building a separate, disconnected process.",
      },
      {
        question: "We're on legacy infrastructure. Is a full DevOps setup realistic?",
        answer:
          "Usually, yes, incrementally. We typically start with the highest-friction part of your release process and build out from there, rather than requiring a full rebuild before you see any benefit.",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // Training
  // ---------------------------------------------------------------------
  {
    slug: "istqb-certification",
    title: "ISTQB Certification Prep",
    category: "Training",
    eyebrow: "Get certified",
    summary:
      "Independent, instructor-led prep for ISTQB certification exams, with live classes, mock exams, and an optional prepaid exam voucher bundle.",
    description:
      "Our ISTQB Certification Pathways program is an independent preparation track that gets you ready for the official exam, with live instructor-led classes, QA Solucity study guides, and full-length mock exams. Choose the Self-Starter Prep Track and book your own exam later, or the All-Inclusive Bundle with a prepaid official exam voucher included in one Naira invoice.",
    highlights: [
      "Live, instructor-led ISTQB prep classes",
      "QA Solucity study guides and hands-on exercises",
      "Full-length mock exams with scored feedback",
      "Optional prepaid official exam voucher bundle",
    ],
    outcomes: [
      "Walk into exam day fully prepared",
      "Formalize your QA expertise with a recognized credential",
      "Skip the currency and registrar hassle with the Bundle route",
    ],
    deliverables: [
      "Live class schedule and recordings",
      "Study guides and slide decks",
      "Scored mock exam reports",
    ],
    tools: ["Live virtual classroom", "Mock exam simulators", "Independent registrar (AT*SQA / iSQI)"],
    idealFor: ["QA professionals seeking certification", "Career switchers into QA", "Teams standardizing on ISTQB"],
    faqs: [
      {
        question: "Is QA Solucity an official ISTQB partner?",
        answer:
          "No. QA Solucity is an independent training provider, not an official partner, accredited center, or authorized testing provider of ISTQB or NGSTQB. Your official exam is written, administered, and proctored entirely by an independent exam board such as AT*SQA or iSQI.",
      },
      {
        question: "What's the difference between the two enrollment routes?",
        answer:
          "The Self-Starter Prep Track covers training only, and you book and pay for your official exam directly with the registrar whenever you're ready. The All-Inclusive Bundle adds a prepaid official exam voucher to your training, in one Naira payment.",
      },
    ],
    icon: Award,
    href: "/certification",
    relatedSlugs: ["corporate-training", "qa-career-launchpad", "tools-training"],
  },
  {
    slug: "qa-career-launchpad",
    title: "QA Career Launchpad",
    category: "Training",
    eyebrow: "Beginner to job-ready",
    summary:
      "Go from complete beginner to job-ready QA engineer with hands-on, mentor-led training in manual and automated testing.",
    description:
      "The QA Career Launchpad is a structured, mentor-led program for people starting a software testing career from scratch. You'll build real manual and automation testing skills on realistic projects, not toy examples, with a mentor guiding you the whole way, so you come out the other side with a portfolio and the confidence to apply for QA roles.",
    highlights: [
      "Structured curriculum from testing fundamentals to automation",
      "Hands-on projects on realistic applications",
      "One-on-one mentorship from working QA engineers",
      "Portfolio and interview preparation support",
    ],
    outcomes: [
      "Build job-ready manual and automation testing skills",
      "Graduate with a portfolio you can show employers",
      "Move from complete beginner to confident QA engineer",
    ],
    deliverables: [
      "Structured learning curriculum",
      "Hands-on project assignments",
      "Mentor feedback and career guidance",
    ],
    tools: ["Manual testing fundamentals", "Selenium", "Playwright", "Jira"],
    idealFor: ["Career switchers", "Recent graduates", "Anyone new to software testing"],
    faqs: [
      {
        question: "Do I need any prior experience to join?",
        answer:
          "No. The QA Career Launchpad is built for complete beginners. We start from testing fundamentals and build up from there.",
      },
      {
        question: "Will I learn automation, or just manual testing?",
        answer:
          "Both. You'll build a solid manual testing foundation first, then move into automation tooling like Selenium and Playwright once the fundamentals are solid.",
      },
      {
        question: "Is this the same as ISTQB certification?",
        answer:
          "No. The QA Career Launchpad teaches practical, job-ready QA skills and gives you a portfolio; it isn't a certification exam. If you also want a globally recognized credential, see our separate ISTQB Certification Pathways program.",
      },
      {
        question: "Do you guarantee job placement?",
        answer:
          "No, and we're upfront about that. What we do provide is portfolio review, interview preparation, and career guidance to help you present your new skills to employers with confidence.",
      },
    ],
    icon: Rocket,
    href: "/qa-career-launchpad",
    relatedSlugs: ["tools-training", "corporate-training", "istqb-certification"],
  },
  {
    slug: "tools-training",
    title: "Tools Proficiency Training",
    category: "Training",
    eyebrow: "Get hands-on quickly",
    summary:
      "Master industry-leading testing tools, Selenium, Playwright, JIRA, and more, with hands-on sessions built around real tasks, not slides.",
    description:
      "We coach teams on the tools they use every day for quality engineering and delivery, Playwright, Selenium, Postman, Jira, and increasingly, AI-assisted testing tools, so they can move from theory to execution faster. Every session is built around real tasks and realistic test environments, with live troubleshooting instead of a lecture-only format.",
    highlights: [
      "Tool-focused, hands-on practical sessions",
      "Workflow and process integration coaching",
      "Role-based learning paths",
      "Live troubleshooting and Q&A",
      "AI-assisted testing tool tracks available",
    ],
    outcomes: [
      "Raise tool adoption across the team",
      "Improve delivery efficiency and reduce tool-related friction",
      "Reduce onboarding time for new hires and new tools",
    ],
    deliverables: [
      "Training playbooks",
      "Tool walkthroughs and cheat sheets",
      "Implementation checklists",
    ],
    tools: ["Playwright", "Selenium", "Jira", "Postman", "AI-assisted testing tools"],
    idealFor: ["QA teams", "Developers", "Ops and product teams"],
    icon: Wrench,
    relatedSlugs: ["corporate-training", "qa-career-launchpad", "automation-testing"],
    capabilityGrid: {
      eyebrow: "Tracks",
      heading: "Pick the tools your team actually needs",
      columns: 3,
      items: [
        { icon: Bot, title: "Selenium & WebDriver", description: "Classic automation fundamentals for teams standardizing on a mature, widely-supported stack." },
        { icon: Rocket, title: "Playwright", description: "Modern, fast, cross-browser automation for teams building automation from scratch." },
        { icon: Webhook, title: "API Testing Tools", description: "Postman and Newman for building, running, and automating API test suites." },
        { icon: Activity, title: "Test & Defect Management", description: "Jira, TestRail, and Xray workflows for planning, tracking, and reporting." },
        { icon: Workflow, title: "CI/CD Tooling", description: "GitHub Actions and Jenkins basics for wiring automation into the delivery pipeline." },
        { icon: BrainCircuit, title: "AI-Assisted Testing Tools", description: "Practical, hands-on introduction to AI-assisted test generation and evaluation tooling." },
      ],
    },
    process: {
      eyebrow: "Learning path",
      heading: "From assessment to real project application",
      steps: [
        { title: "Assess current tooling", description: "We baseline what your team already knows and where the gaps actually are." },
        { title: "Hands-on labs", description: "Real tasks on realistic environments, not slide-only theory." },
        { title: "Apply to your project", description: "Sessions built around your actual codebase and workflows wherever possible." },
        { title: "Implementation checklist", description: "A concrete checklist your team can keep using after the training ends." },
      ],
    },
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
      {
        question: "Can this be combined with a Test Automation engagement?",
        answer:
          "Yes, this is a common pairing. We often deliver Tools Proficiency Training alongside a Test Automation build-out, so your team builds real capability alongside the suite we deliver.",
      },
    ],
  },
  {
    slug: "corporate-training",
    title: "Corporate QA Training",
    category: "Training",
    eyebrow: "Upskill teams",
    summary:
      "Build stronger QA capability across your organization with practical, scenario-based learning that sticks, not generic slides.",
    description:
      "Our corporate training programs blend core QA principles, modern tooling, and real product scenarios to help teams perform better in daily delivery, not just pass a quiz at the end. We design a curriculum around your team's actual maturity level and product domain, then deliver it hands-on, remote or in person.",
    highlights: [
      "Custom curriculum for your team",
      "Hands-on exercises and coaching",
      "Flexible delivery for in-person or remote teams",
      "Real product scenarios, not generic examples",
    ],
    outcomes: [
      "Strengthen team capability across manual and automated testing",
      "Reduce avoidable defects reaching later stages",
      "Improve collaboration and quality ownership across roles",
    ],
    deliverables: [
      "Training materials tailored to your team",
      "Exercise kits and real-scenario labs",
      "Post-training guidance and resources",
    ],
    tools: ["Custom curriculum", "Hands-on labs", "Playwright", "Real case studies"],
    idealFor: ["Rising product teams", "New QA hires", "Upskilling initiatives"],
    icon: GraduationCap,
    relatedSlugs: ["tools-training", "qa-career-launchpad", "qa-consulting"],
    capabilityGrid: {
      eyebrow: "Training tracks",
      heading: "Curriculum tracks we draw from",
      columns: 3,
      items: [
        { icon: ShieldCheck, title: "Manual Testing Fundamentals", description: "Core testing principles, test design techniques, and defect reporting." },
        { icon: Bot, title: "Automation Bootcamp", description: "Hands-on introduction to building and maintaining automated test suites." },
        { icon: Webhook, title: "API Testing", description: "Practical API testing skills using Postman and contract validation." },
        { icon: Compass, title: "Agile QA Practices", description: "Embedding quality practices into sprint-based, agile delivery." },
        { icon: GraduationCap, title: "QA Leadership & Management", description: "For leads and managers building or scaling a QA function." },
        { icon: BrainCircuit, title: "AI Testing Fundamentals", description: "An introduction to testing AI-powered features for teams shipping them." },
      ],
    },
    process: {
      eyebrow: "Delivery model",
      heading: "From curriculum design to a certificate of completion",
      steps: [
        { title: "Assess maturity", description: "We baseline your team's current skills and identify the highest-impact gaps." },
        { title: "Design curriculum", description: "A program built around your product domain, not a generic off-the-shelf deck." },
        { title: "Hands-on delivery", description: "Live sessions with real exercises, remote or in person, sized for your group." },
        { title: "Assess & certify", description: "Practical assessment and a certificate of completion for each participant." },
      ],
    },
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
      {
        question: "Can you build a curriculum around our specific product and tools?",
        answer:
          "Yes. We design the curriculum around your team's actual maturity level, tech stack, and product domain rather than a one-size-fits-all deck.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: ServiceDetail, limit = 3) {
  if (service.relatedSlugs && service.relatedSlugs.length > 0) {
    const curated = service.relatedSlugs
      .map((slug) => getServiceBySlug(slug))
      .filter((item): item is ServiceDetail => Boolean(item));
    if (curated.length > 0) {
      return curated.slice(0, limit);
    }
  }

  return services
    .filter((item) => item.category === service.category && item.slug !== service.slug)
    .slice(0, limit);
}
