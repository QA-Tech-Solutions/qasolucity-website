import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesCTA() {
  return (
    <Section className="bg-[#FAF8F4] py-28">
      <Container>
        <div className="overflow-hidden rounded-[40px] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,.35)] lg:px-14 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-200">
              Need a tailored plan?
            </p>
            <Heading as="h3" level="h3" className="mt-4 text-white">
              Let’s map the right quality services to your product roadmap.
            </Heading>
            <Text className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Tell us where you are in the product lifecycle and we’ll recommend the right mix of testing, consulting, and enablement.
            </Text>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-6 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-1"
            >
              Start a conversation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/20 px-6 text-sm font-semibold text-white/90 transition-all hover:bg-white/10"
            >
              Browse services again
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
