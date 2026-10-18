import FailuresList from "@/features/dashboard/components/FailuresList";
import { buildMetadata } from "@/lib/page-metadata";

export const metadata = buildMetadata({
  title: "Failures",
  description: "Everything currently failing or flaky across our most recent automation runs.",
  path: "/dashboard/failures",
});

export default function Page() {
  return <FailuresList />;
}
