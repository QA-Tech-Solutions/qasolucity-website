import AnalyticsContent from "@/features/dashboard/components/AnalyticsContent";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "Analytics",
  description: "Pass rate trend, run duration, and desktop vs. mobile results from our daily automation runs.",
  path: "/dashboard/analytics",
});

export default function Page() {
  return <AnalyticsContent />;
}
