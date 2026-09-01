import type { Metadata } from "next";
import FailuresList from "@/features/dashboard/components/FailuresList";

export const metadata: Metadata = {
  title: "Failures",
};

export default function Page() {
  return <FailuresList />;
}
