import type { Metadata } from "next";
import AboutPage from "@/features/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "QA Solucity helps businesses build reliable digital products and helps QA professionals build real careers in software testing.",
  alternates: {
    canonical: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}