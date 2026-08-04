import { BookOpen, FileText, GraduationCap, Sparkles, type LucideIcon } from "lucide-react";

export interface ResourceCategory {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  highlights: string[];
  outcomes: string[];
  icon: LucideIcon;
}

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "templates",
    title: "QA Templates",
    eyebrow: "Practical assets",
    summary: "Use proven checklists and planning frameworks to accelerate quality work without reinventing the wheel.",
    description: "These templates help teams move faster from kickoff to delivery with a shared structure for testing, reviews, and release readiness.",
    highlights: ["Release checklists", "Test planning sheets", "Risk review formats"],
    outcomes: ["Reduce setup time", "Improve consistency", "Support better collaboration"],
    icon: FileText,
  },
  {
    slug: "guides",
    title: "QA Guides",
    eyebrow: "Best practices",
    summary: "Learn how to design quality routines that are clear, repeatable, and aligned to modern delivery models.",
    description: "Our guides translate strategy into everyday practices that teams can adopt with confidence and apply immediately.",
    highlights: ["Test strategy playbooks", "Coverage guidance", "Execution handbooks"],
    outcomes: ["Strengthen team habits", "Improve quality decisions", "Reduce avoidable rework"],
    icon: BookOpen,
  },
  {
    slug: "ebooks",
    title: "E-books",
    eyebrow: "Deeper reading",
    summary: "Explore thoughtful perspectives on quality, delivery, and building better digital products at scale.",
    description: "These e-books connect quality practices to broader product, delivery, and growth goals in a more extended format.",
    highlights: ["Strategic perspectives", "Practical examples", "Retrospective insights"],
    outcomes: ["Learn from experience", "Broaden thinking", "Support smarter investment"],
    icon: Sparkles,
  },
  {
    slug: "events",
    title: "Events & Workshops",
    eyebrow: "Live learning",
    summary: "Join focused sessions that blend practical insight, team discussion, and hands-on guidance.",
    description: "From workshops to speaking engagements, these events help teams sharpen how they plan, review, and improve quality.",
    highlights: ["Live sessions", "Team workshops", "Expert-led discussions"],
    outcomes: ["Spark new ideas", "Accelerate alignment", "Create shared momentum"],
    icon: GraduationCap,
  },
];

export function getResourceBySlug(slug: string) {
  return resourceCategories.find((resource) => resource.slug === slug);
}
