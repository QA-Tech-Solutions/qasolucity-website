import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SolutionsHero() {
  return (
    <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#fdfcfb_0%,_#f5f3ff_44%,_#eef2ff_100%)] pt-36 pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-6%] top-[-8%] h-72 w-72 rounded-full bg-indigo-200/50 blur-[140px]" />
        <div className="absolute right-[-4%] top-[10%] h-80 w-80 rounded-full bg-sky-200/40 blur-[140px]" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Built for product teams that need momentum
          </div>

          <Heading as="h1" level="h1" className="mt-8 text-[clamp(2.4rem,4.2vw,3.8rem)] leading-[0.95] tracking-[-0.04em] text-slate-900">
            Solutions that turn quality into a business advantage.
          </Heading>

          <Text className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Whether you are launching a new product, scaling releases, or tightening delivery processes, we bring the right mix of testing, strategy, and execution support.
          </Text>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-1">
              Talk to our team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a href="#solutions" className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-6 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:bg-white">
              Explore solutions
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
