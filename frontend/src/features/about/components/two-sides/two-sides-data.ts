import { Building2, GraduationCap } from "lucide-react";

export const twoSides = [
  {
    number: "01",
    icon: Building2,
    audience: "For Businesses",
    title: "Build with confidence.",
    description:
      "We help businesses test websites, applications and digital products, uncover issues and improve the quality of their customer experience.",
    button: "Explore Business Services",
    href: "/services",
  },
  {
    number: "02",
    icon: GraduationCap,
    audience: "For QA Professionals",
    title: "Build your QA career.",
    description:
      "We help aspiring and growing QA professionals develop practical skills, access industry-recognised certification pathways and gain opportunities to grow within the field.",
    button: "Explore QA Training",
    href: "/contact",
  },
] as const;
