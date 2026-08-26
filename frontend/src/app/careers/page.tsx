import type { Metadata } from "next";
import CareersPage from "@/features/careers/components/CareersPage";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join QA Solucity. Help businesses ship better software and help QA professionals build real careers, on a small remote-friendly team.",
  alternates: {
    canonical: "/careers",
  },
};

export default function Page() {
  return <CareersPage />;
}
