import { notFound } from "next/navigation";

// The /resources hub is disabled for now - most of its categories
// (templates/guides/ebooks/events) are still "coming soon" (see
// comingSoon in navigation.ts), with only Blog and FAQs actually live,
// and those already have their own real routes (/blogs, /faq).
// To bring this page back once the categories are ready, delete the
// notFound() page below and uncomment the original one.
export default function Page() {
  notFound();
}

// --- Original page, restore when /resources is ready to ship ---
//
// import type { Metadata } from "next";
// import ResourcesPage from "@/features/resources";
//
// export const metadata: Metadata = {
//   title: "Resources",
//   description:
//     "Templates, guides, e-books, and events for teams that want to build smarter testing habits without slowing delivery down.",
//   alternates: {
//     canonical: "/resources",
//   },
// };
//
// export default function Page() {
//   return <ResourcesPage />;
// }
