import { Suspense } from "react";
import type { Metadata } from "next";
import Footer from "@/features/home/components/footer";
import ConfirmationContent from "@/features/certification/components/ConfirmationContent";

export const metadata: Metadata = {
  title: "Enrollment Confirmed",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </>
  );
}
