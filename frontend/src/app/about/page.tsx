import AboutPage from "@/features/about";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "QA Solucity helps businesses build reliable digital products and helps QA professionals build real careers in software testing.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}