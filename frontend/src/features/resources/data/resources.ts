import { BookOpen, FileText, GraduationCap, Sparkles, type LucideIcon } from "lucide-react";

export interface ResourceFAQ {
  question: string;
  answer: string;
}

export interface ResourceCategory {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: string[];
  outcomes: string[];
  faqs: ResourceFAQ[];
  icon: LucideIcon;
}

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "templates",
    title: "QA Templates",
    eyebrow: "Practical assets",
    summary:
      "Use proven checklists and planning frameworks to accelerate quality work without reinventing the wheel.",
    description:
      "These templates help teams move faster from kickoff to delivery with a shared structure for testing, reviews, and release readiness, built from patterns we use in real engagements, not generic downloads.",
    highlights: ["Release checklists", "Test planning sheets", "Risk review formats"],
    outcomes: ["Reduce setup time", "Improve consistency", "Support better collaboration"],
    faqs: [
      {
        question: "Are these templates specific to certain tools?",
        answer:
          "No. They're built to work with whatever you already use, Jira, Notion, spreadsheets, or plain documents, so adoption doesn't depend on a tool migration.",
      },
      {
        question: "How do I get access to the templates?",
        answer:
          "Reach out through the contact form and let us know which templates are most relevant to your team, we'll share the ones that fit.",
      },
    ],
    icon: FileText,
  },
  {
    slug: "guides",
    title: "QA Guides",
    eyebrow: "Best practices",
    summary:
      "Learn how to design quality routines that are clear, repeatable, and aligned to modern delivery models.",
    description:
      "Our guides translate strategy into everyday practices that teams can adopt with confidence and apply immediately, drawn from real engagements rather than theory.",
    highlights: ["Test strategy playbooks", "Coverage guidance", "Execution handbooks"],
    outcomes: ["Strengthen team habits", "Improve quality decisions", "Reduce avoidable rework"],
    faqs: [
      {
        question: "Where can I read your guides?",
        answer:
          "Many of our guides are published on the blog. New in-depth guides and playbooks are added regularly, check back or reach out for a specific topic.",
      },
      {
        question: "Can you write a guide specific to our stack?",
        answer:
          "For engaged clients, yes. We can tailor a guide or playbook to your team's specific tools and workflow as part of a QA strategy or process engagement.",
      },
    ],
    icon: BookOpen,
  },
  {
    slug: "ebooks",
    title: "E-books",
    eyebrow: "Deeper reading",
    summary:
      "Explore thoughtful perspectives on quality, delivery, and building better digital products at scale.",
    description:
      "These e-books connect quality practices to broader product, delivery, and growth goals in a more extended format than a single blog post allows.",
    highlights: ["Strategic perspectives", "Practical examples", "Retrospective insights"],
    outcomes: ["Learn from experience", "Broaden thinking", "Support smarter investment"],
    faqs: [
      {
        question: "Are the e-books free?",
        answer:
          "Yes. Our e-books are free to request, we see them as a way to share what we've learned, not a lead-gen paywall.",
      },
      {
        question: "How often do you publish new e-books?",
        answer:
          "We publish new titles periodically, focused on topics we hear repeatedly from clients. Get in touch to be notified when a new one lands.",
      },
    ],
    icon: Sparkles,
  },
  {
    slug: "events",
    title: "Events & Workshops",
    eyebrow: "Live learning",
    summary:
      "Join focused sessions that blend practical insight, team discussion, and hands-on guidance.",
    description:
      "From workshops to speaking engagements, these events help teams sharpen how they plan, review, and improve quality, live, not just read about it.",
    highlights: ["Live sessions", "Team workshops", "Expert-led discussions"],
    outcomes: ["Spark new ideas", "Accelerate alignment", "Create shared momentum"],
    faqs: [
      {
        question: "Are events open to the public or private for clients?",
        answer:
          "Both. We host public sessions periodically, and we run private workshops tailored to a single team as part of our Training services.",
      },
      {
        question: "Can you run a workshop for our team specifically?",
        answer:
          "Yes, that's exactly what our Workshops service is for. Head to our services page or contact us directly to scope one for your team.",
      },
    ],
    icon: GraduationCap,
  },
];

export function getResourceBySlug(slug: string) {
  return resourceCategories.find((resource) => resource.slug === slug);
}
