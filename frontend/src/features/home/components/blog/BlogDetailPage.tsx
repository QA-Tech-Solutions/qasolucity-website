import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock3 } from "lucide-react";
import Footer from "@/features/home/components/footer";
import type { Blog } from "./blogs-data";

interface BlogDetailPageProps {
  blog: Blog;
}

export default function BlogDetailPage({ blog }: BlogDetailPageProps) {
  return (
    <>
      <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#fdf2f8_100%)] pt-36 pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-6%] top-[-8%] h-72 w-72 rounded-full bg-indigo-200/50 blur-[140px]" />
          <div className="absolute right-[-4%] top-[12%] h-80 w-80 rounded-full bg-violet-200/50 blur-[140px]" />
        </div>

        <Container>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-900">
            <ArrowLeft className="h-4 w-4" />
            Back to all articles
          </Link>

          <div className="mt-10 rounded-[40px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur lg:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-2 font-semibold uppercase tracking-[0.24em] text-indigo-700">
                {blog.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {blog.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {blog.readTime}
              </span>
            </div>

            <Heading as="h1" level="h1" className="mt-8 text-[clamp(2.2rem,3.6vw,3.1rem)] leading-[1.02] tracking-[-0.04em] text-slate-900">
              {blog.title}
            </Heading>

            <Text className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {blog.excerpt}
            </Text>

            <div className="mt-10 overflow-hidden rounded-[32px] border border-slate-200/80">
              <Image src={blog.image} alt={blog.title} width={1400} height={900} className="h-[320px] w-full object-cover lg:h-[460px]" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white py-24">
        <Container>
          <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200/80 bg-slate-50/70 p-8 shadow-sm lg:p-10">
            <Text className="text-lg leading-8 text-slate-600">
              This article is part of our practical library of quality insights built for teams balancing speed, delivery pressure, and long-term product confidence.
            </Text>
            <Text className="mt-6 text-lg leading-8 text-slate-600">
              We focus on clear, actionable guidance that helps product teams make better decisions without adding unnecessary overhead to their delivery rhythm.
            </Text>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-1">
                Talk to our team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/resources" className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50">
                Browse more resources
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
