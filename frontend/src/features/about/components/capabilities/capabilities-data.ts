import {
  Bug,
  Bot,
  Gauge,
  Layers3,
  Briefcase,
  GraduationCap,
  Award,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

export const capabilityGroups = [
  {
    audience: "For Businesses",
    items: [
      { icon: Bug, label: "Software Testing" },
      { icon: Bot, label: "Test Automation" },
      { icon: Gauge, label: "API & Performance Testing" },
      { icon: Layers3, label: "Quality Engineering" },
      { icon: Briefcase, label: "QA Consulting" },
    ],
  },
  {
    audience: "For QA Professionals",
    items: [
      { icon: GraduationCap, label: "QA Training" },
      { icon: Award, label: "Certification Support" },
      { icon: ClipboardCheck, label: "Practical QA Experience" },
      { icon: TrendingUp, label: "Career Development" },
    ],
  },
] as const;
