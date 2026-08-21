import { services } from "@/features/services/data/services";
import { solutions } from "@/features/solutions/data/solutions";
import { resourceCategories } from "@/features/resources/data/resources";
import { contactFaqs } from "@/features/contact/components/contact-faq/contact-faq-data";

export interface FaqEntry {
  question: string;
  answer: string;
  category: "General" | "Services" | "Solutions" | "Resources";
  source?: { label: string; href: string };
}

const serviceFaqs: FaqEntry[] = services.flatMap((service) =>
  service.faqs.map((faq) => ({
    ...faq,
    category: "Services" as const,
    source: { label: service.title, href: `/services/${service.slug}` },
  }))
);

const solutionFaqs: FaqEntry[] = solutions.flatMap((solution) =>
  solution.faqs.map((faq) => ({
    ...faq,
    category: "Solutions" as const,
    source: { label: solution.title, href: `/solutions/${solution.slug}` },
  }))
);

const resourceFaqs: FaqEntry[] = resourceCategories.flatMap((resource) =>
  resource.faqs.map((faq) => ({
    ...faq,
    category: "Resources" as const,
    source: { label: resource.title, href: `/resources/${resource.slug}` },
  }))
);

const generalFaqs: FaqEntry[] = contactFaqs.map((faq) => ({
  ...faq,
  category: "General" as const,
}));

export const faqs: FaqEntry[] = [
  ...generalFaqs,
  ...serviceFaqs,
  ...solutionFaqs,
  ...resourceFaqs,
];

export const faqCategories = [
  "All",
  "General",
  "Services",
  "Solutions",
  "Resources",
] as const;
