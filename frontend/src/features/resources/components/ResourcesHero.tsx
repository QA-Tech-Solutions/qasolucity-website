import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ResourcesHero() {
  return (
    <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#fdf2f8_100%)] pt-36 pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-6%] top-[-8%] h-72 w-72 rounded-full bg-indigo-200/50 blur-[140px]" />
        <div className="absolute right-[-4%] top-[12%] h-80 w-80 rounded-full bg-violet-200/50 blur-[140px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Materials to help teams move with confidence
          </div>

          <Heading as="h1" level="h1" className="mt-8 text-[clamp(2.4rem,4.2vw,3.8rem)] leading-[0.95] tracking-[-0.04em] text-slate-900">
            Practical resources for better quality thinking.
          </Heading>

          <Text className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Explore templates, guides, and events shaped for teams that want to build smarter testing habits without slowing delivery down.
          </Text>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-1">
              Request a resource pack
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a href="#resources" className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-6 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:bg-white">
              Browse resources
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
