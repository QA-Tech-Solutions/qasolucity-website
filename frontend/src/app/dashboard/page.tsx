import OverviewContent from "@/features/dashboard/components/OverviewContent";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "Quality Dashboard",
  description:
    "Live pass rate, test coverage, and site health from the automation suite we run against qasolucity.com every day.",
  path: "/dashboard",
});

export default function Page() {
  return <OverviewContent />;
}
