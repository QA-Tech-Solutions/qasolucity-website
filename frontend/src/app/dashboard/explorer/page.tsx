import TestExplorer from "@/features/dashboard/components/TestExplorer";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "Test Explorer",
  description: "A searchable catalog of every test in our automation suite and its most recent result.",
  path: "/dashboard/explorer",
});

export default function Page() {
  return <TestExplorer />;
}
