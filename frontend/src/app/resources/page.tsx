import type { Metadata } from "next";
import ResourcesPage from "@/features/resources";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Templates, guides, e-books, and events for teams that want to build smarter testing habits without slowing delivery down.",
};

export default function Page() {
  return <ResourcesPage />;
}
