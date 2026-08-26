import type { Metadata } from "next";
import { isAdminSessionValid } from "@/lib/admin-auth";
import AdminAccessGate from "@/features/admin/components/AdminAccessGate";
import VoucherLogDownload from "@/features/admin/components/VoucherLogDownload";

export const metadata: Metadata = {
  title: "Voucher Log",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const authenticated = await isAdminSessionValid();

  if (!authenticated) {
    return <AdminAccessGate />;
  }

  return <VoucherLogDownload />;
}
