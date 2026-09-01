import type { Metadata } from "next";
import DashboardShell from "@/features/dashboard/components/DashboardShell";

export const metadata: Metadata = {
  title: {
    default: "Quality Dashboard",
    template: "%s | Quality Dashboard",
  },
  description:
    "Live test results and execution history from the automated QA suite QA Solucity runs against its own site, qasolucity.com.",
  alternates: {
    canonical: "/dashboard",
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
