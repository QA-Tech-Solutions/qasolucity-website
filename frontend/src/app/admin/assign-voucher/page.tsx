import type { Metadata } from "next";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { allCertifications } from "@/features/certification/data/certification-data";
import AdminAccessGate from "@/features/admin/components/AdminAccessGate";
import AssignVoucherForm from "@/features/admin/components/AssignVoucherForm";

export const metadata: Metadata = {
  title: "Assign Voucher",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{
    certification?: string;
    code?: string;
    customerName?: string;
    customerEmail?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const authenticated = await isAdminSessionValid();

  if (!authenticated) {
    return <AdminAccessGate />;
  }

  const { certification = "", code = "", customerName = "", customerEmail = "" } = await searchParams;
  const certificationEntry = allCertifications.find((item) => item.code === certification);

  if (!certificationEntry) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-4 pt-44 pb-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Missing certification</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          This link needs a valid <code>certification</code> code in the URL. Open it from the enrollment
          notification email instead of typing it in directly.
        </p>
      </div>
    );
  }

  return (
    <AssignVoucherForm
      certification={certification}
      certificationName={certificationEntry.name}
      customerName={customerName}
      customerEmail={customerEmail}
      suggestedCode={code}
    />
  );
}
