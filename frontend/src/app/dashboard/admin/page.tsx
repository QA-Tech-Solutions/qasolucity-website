import type { Metadata } from "next";
import { isAdminSessionValid } from "@/lib/admin-auth";
import DashboardAccessGate from "@/features/dashboard/components/DashboardAccessGate";
import AdminTestsList from "@/features/dashboard/components/AdminTestsList";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const authenticated = await isAdminSessionValid();
  if (!authenticated) {
    return <DashboardAccessGate description="Admin suite results are only visible to the team." />;
  }
  return <AdminTestsList />;
}
