import type { Metadata } from "next";
import Footer from "@/features/home/components/footer";
import CertificationHero from "@/features/certification/components/CertificationHero";
import CertificationPathways from "@/features/certification/components/CertificationPathways";
import CertificationCatalog from "@/features/certification/components/CertificationCatalog";
import CertificationFAQ from "@/features/certification/components/CertificationFAQ";

export const metadata: Metadata = {
  title: "ISTQB Certification Pathways",
  description:
    "Independent ISTQB exam prep from QA Solucity, with live classes and mock exams, then sit your official exam through an independent registrar like AT*SQA or iSQI. Choose the Self-Starter Prep Track, or the All-Inclusive Bundle with a prepaid exam voucher.",
  alternates: {
    canonical: "/certification",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "ISTQB Certification Preparation Program",
    description:
      "Independent, instructor-led preparation for ISTQB certification exams, with live classes, study guides, and mock exams. QA Solucity is not an official ISTQB or NGSTQB partner, accredited center, or authorized testing provider; official exams are administered by independent registrars such as AT*SQA and iSQI.",
    provider: {
      "@type": "ProfessionalService",
      name: "QA Solucity",
      url: "https://qasolucity.com",
    },
    url: "https://qasolucity.com/certification",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CertificationHero />
      <CertificationPathways />
      <CertificationCatalog />
      <CertificationFAQ />
      <Footer />
    </>
  );
}
