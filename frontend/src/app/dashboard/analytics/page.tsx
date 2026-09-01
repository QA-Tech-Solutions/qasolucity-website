import type { Metadata } from "next";
import AnalyticsContent from "@/features/dashboard/components/AnalyticsContent";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function Page() {
  return <AnalyticsContent />;
}
