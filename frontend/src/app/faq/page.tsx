import FaqPage from "@/features/faq";
import { faqs } from "@/features/faq/data/faq-data";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "FAQs",
  description:
    "Answers to the most common questions about QA Solucity's services, resources, and how we work with clients.",
  path: "/faq",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqPage />
    </>
  );
}
