import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PrivacyContent from "./components/PrivacyContent";
import Footer from "@/features/home/components/footer";

export const metadata = {
  title: "Privacy Policy | QA Solucity",
  description:
    "QA Solucity's privacy policy: how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="pb-32">
        <Section className="relative overflow-hidden bg-gradient-to-b from-slate-100 dark:from-slate-800 via-white dark:via-slate-900 to-white dark:to-slate-900 pt-44 pb-32">
          {/* Background - static elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Static glows */}
            <div className="absolute -left-28 top-24 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-[140px]" />
            <div className="absolute -right-28 bottom-0 h-[550px] w-[550px] rounded-full bg-violet-200/30 blur-[180px]" />

            {/* Static blobs */}
            <div className="absolute top-20 left-[10%] h-32 w-32 rounded-full bg-indigo-200/20 blur-2xl" />
            <div className="absolute bottom-32 right-[15%] h-40 w-40 rounded-full bg-violet-200/20 blur-2xl" />

            {/* Decorative dots */}
            <div className="absolute right-20 top-20 grid grid-cols-4 gap-3 opacity-20">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-indigo-400" />
              ))}
            </div>
            <div className="absolute bottom-20 left-20 grid grid-cols-4 gap-3 opacity-20">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-violet-400" />
              ))}
            </div>

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #0f172a 1px, transparent 1px),
                  linear-gradient(to bottom, #0f172a 1px, transparent 1px)
                `,
                backgroundSize: "48px 48px",
              }}
            />

            {/* Radial fade */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(248,250,252,0.3)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.4)_100%)]" />
          </div>

          <Container>
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors duration-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            {/* Header */}
            <div className="mt-8 max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-800/40 bg-indigo-50/50 dark:bg-indigo-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
                </span>
                Legal
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                  Privacy Policy
              </span>
              </h1>

              <p className="mt-4 text-lg text-slate-500 dark:text-slate-400">
                Last updated: August 29, 2026
              </p>
            </div>
          </Container>
        </Section>

        <Container>
          <div className="mx-auto max-w-4xl -mt-12">
            <PrivacyContent />
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}