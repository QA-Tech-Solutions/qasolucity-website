import type { Metadata } from "next";
import ContactPage from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with QA Solucity: book a free consultation and let's talk through your QA challenges and goals.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}