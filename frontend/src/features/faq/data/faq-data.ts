import { services } from "@/features/services/data/services";
import { resourceCategories } from "@/features/resources/data/resources";
import { contactFaqs } from "@/features/contact/components/contact-faq/contact-faq-data";

// The /faq page doesn't own any FAQ content of its own - every question
// here already lives next to the page it's about (each service and
// resource ships its own `faqs` array, and general questions live on
// the contact page). This file just pulls all of those together into one
// searchable list, tagging each with where it came from. That also means
// this page can't drift out of sync with the per-page FAQs: add a
// question to a service's data file and it shows up here automatically.
export interface FaqEntry {
  question: string;
  answer: string;
  category: "General" | "Services" | "Resources";
  source?: { label: string; href: string };
}

const serviceFaqs: FaqEntry[] = services.flatMap((service) =>
  service.faqs.map((faq) => ({
    ...faq,
    category: "Services" as const,
    source: { label: service.title, href: service.href ?? `/services/${service.slug}` },
  }))
);

const resourceFaqs: FaqEntry[] = resourceCategories.flatMap((resource) =>
  resource.faqs.map((faq) => ({
    ...faq,
    category: "Resources" as const,
    source: { label: resource.title, href: `/resources/${resource.slug}` },
  }))
);

// General questions don't point back to a specific service/resource page,
// so there's no `source` link for these - they're already about the
// company as a whole, not any one offering.
const generalFaqs: FaqEntry[] = contactFaqs.map((faq) => ({
  ...faq,
  category: "General" as const,
}));

export const faqs: FaqEntry[] = [
  ...generalFaqs,
  ...serviceFaqs,
  ...resourceFaqs,
];

export const faqCategories = [
  "All",
  "General",
  "Services",
  "Resources",
] as const;
