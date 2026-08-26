import type { Metadata } from "next";
import LaunchpadPage from "@/features/qa-career-launchpad/components/LaunchpadPage";

export const metadata: Metadata = {
  title: "QA Career Launchpad",
  description:
    "Go from complete beginner to job-ready QA engineer with hands-on, mentor-led training in manual and automated testing. No prior experience required.",
  alternates: {
    canonical: "/qa-career-launchpad",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "QA Career Launchpad",
    description:
      "A structured, mentor-led program for people starting a software testing career from scratch, covering manual testing, test automation, and portfolio and interview preparation.",
    provider: {
      "@type": "ProfessionalService",
      name: "QA Solucity",
      url: "https://qasolucity.com",
    },
    url: "https://qasolucity.com/qa-career-launchpad",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LaunchpadPage />
    </>
  );
}
