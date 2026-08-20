import type { Metadata } from "next";

import NotFoundContent from "@/features/not-found/NotFoundContent";
import Footer from "@/features/home/components/footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have moved.",
};

export default function NotFound() {
  return (
    <>
      <NotFoundContent />
      <Footer />
    </>
  );
}
