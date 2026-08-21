import type { Metadata } from "next";
import FaqPage from "@/features/faq";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to the most common questions about QA Solucity's services, solutions, resources, and how we work with clients.",
};

export default function Page() {
  return <FaqPage />;
}
