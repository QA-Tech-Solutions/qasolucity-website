import type { Metadata } from "next";
import TestExplorer from "@/features/dashboard/components/TestExplorer";

export const metadata: Metadata = {
  title: "Test Explorer",
};

export default function Page() {
  return <TestExplorer />;
}
