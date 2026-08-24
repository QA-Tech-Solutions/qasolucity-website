import type { Metadata } from "next";
import ServicesPageShell from "@/features/services/components/ServicesPageShell";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Manual testing, test automation, API and performance testing, QA consulting, and corporate training from QA Solucity.",
  alternates: {
    canonical: "/services",
  },
};

export default function Page() {
  return <ServicesPageShell />;
}
