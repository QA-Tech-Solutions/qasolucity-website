import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/features/home/components/footer";
import type { SolutionDetail } from "../data/solutions";

interface SolutionDetailPageProps {
  solution: SolutionDetail;
}

export default function SolutionDetailPage({ solution }: SolutionDetailPageProps) {
  const Icon = solution.icon;

  return (
    <>
      <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8f7ff_0%,_#eef2ff_45%,_#fdf2f8_100%)] pt-36 pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-6%] top-[-8%] h-72 w-72 rounded-full bg-indigo-200/50 blur-[140px]" />
          <div className="absolute right-[-4%] top-[12%] h-80 w-80 rounded-full bg-violet-200/50 blur-[140px]" />
        </div>

        <Container>
          <Link href="/solutions" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-900">
            <ArrowLeft className="h-4 w-4" />
            Back to all solutions
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/70 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                {solution.eyebrow}
              </div>

              <Heading as="h1" level="h1" className="mt-6 text-[clamp(2.2rem,3.7vw,3.2rem)] leading-[1.02] tracking-[-0.04em] text-slate-900">
                {solution.title}
              </Heading>

              <Text className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {solution.description}
              </Text>

              <div className="mt-8 flex flex-wrap gap-3">
                {solution.highlights.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200/80 bg-white/80 p-7 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-slate-900">Why this works</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{solution.summary}</p>
              <Link href="/contact" className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-1">
                Book a consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200/80 bg-slate-50/70 p-8">
              <h3 className="text-2xl font-semibold text-slate-900">What you can expect</h3>
              <ul className="mt-6 space-y-4">
                {solution.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-base leading-7 text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border border-slate-200/80 bg-slate-50/70 p-8">
              <h3 className="text-2xl font-semibold text-slate-900">Delivered with every engagement</h3>
              <ul className="mt-6 space-y-4">
                {solution.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-indigo-500" />
                    <span className="text-base leading-7 text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-8 text-white shadow-[0_24px_70px_-26px_rgba(15,23,42,0.4)]">
            <h3 className="text-2xl font-semibold">Best fit for</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {solution.idealFor.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
