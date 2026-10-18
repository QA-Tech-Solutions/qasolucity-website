import ContactPage from "@/features/contact";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with QA Solucity: book a free consultation and let's talk through your QA challenges and goals.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}