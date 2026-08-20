"use client";

import { useEffect } from "react";

import ErrorContent from "@/features/error/ErrorContent";
import Footer from "@/features/home/components/footer";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <ErrorContent digest={error.digest} onRetry={unstable_retry} />
      <Footer />
    </>
  );
}
