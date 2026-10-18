import ExecutionsList from "@/features/dashboard/components/ExecutionsList";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "Executions",
  description: "Every reported automation run, with full per-test results for each one.",
  path: "/dashboard/executions",
});

export default function Page() {
  return <ExecutionsList />;
}
