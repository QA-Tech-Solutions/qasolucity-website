import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Footer from "@/features/home/components/footer";
import EnrollmentForm from "@/features/certification/components/EnrollmentForm";
import { getCertificationPricing } from "@/lib/certification-pricing";
import type { Pathway } from "@/features/certification/data/certification-data";

export const metadata: Metadata = {
  title: "Enroll",
  description:
    "Reserve your seat on QA Solucity's Self-Starter Prep Track or All-Inclusive Certification Bundle for your ISTQB certification.",
  alternates: {
    canonical: "/certification/enroll",
  },
};

interface PageProps {
  searchParams: Promise<{ track?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { track } = await searchParams;
  const initialTrack: Pathway["track"] = track === "bundle" ? "bundle" : "prep";
  const pricing = await getCertificationPricing();

  return (
    <>
      <Section className="relative overflow-hidden bg-[#FCFBF8] dark:bg-[#020617] pt-40 pb-20">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -left-24 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/25 blur-[160px]" />
          <div className="absolute -right-24 top-20 h-[450px] w-[450px] rounded-full bg-violet-100/40 dark:bg-violet-900/25 blur-[160px]" />
        </div>
        <Container className="max-w-2xl">
          <EnrollmentForm
            initialTrack={initialTrack}
            trainingFeeNgn={pricing.trainingFeeNgn}
            bundlePriceNgn={pricing.bundlePriceNgn}
          />
        </Container>
      </Section>
      <Footer />
    </>
  );
}
