import type { Metadata } from "next";
import ExecutionsList from "@/features/dashboard/components/ExecutionsList";

export const metadata: Metadata = {
  title: "Executions",
};

export default function Page() {
  return <ExecutionsList />;
}
