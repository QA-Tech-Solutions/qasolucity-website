import CareersPage from "@/features/careers/components/CareersPage";
import { buildMetadata } from "@/lib/page-metadata";

// Whether a posting counts as "open" depends partly on today's date versus
// its deadline (see isJobOpen in lib/careers-status.ts) - a plain fs.readFile
// gives Next.js no signal that this page's output can go stale, so without
// this it would statically freeze whatever was open/closed at build time
// until the next deploy, silently ignoring deadlines that pass in between.
export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join QA Solucity. Help businesses ship better software and help QA professionals build their careers, on a small remote-friendly team.",
  path: "/careers",
});

export default function Page() {
  return <CareersPage />;
}
