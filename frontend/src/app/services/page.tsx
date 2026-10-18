import ServicesPageShell from "@/features/services/components/ServicesPageShell";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Manual testing, test automation, API and performance testing, QA consulting, and corporate training from QA Solucity.",
  path: "/services",
});

export default function Page() {
  return <ServicesPageShell />;
}
