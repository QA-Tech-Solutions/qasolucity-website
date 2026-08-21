"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import ResourceFAQ from "./ResourceFAQ";
import ResourcesCTA from "./ResourcesCTA";
import Footer from "@/features/home/components/footer";
import { getResourceBySlug } from "../data/resources";

interface ResourceDetailPageProps {
  slug: string;
}

export default function ResourceDetailPage({ slug }: ResourceDetailPageProps) {
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return null;
  }

  const Icon = resource.icon;

  return (
    <>
      <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8f7ff_0%,_#eef2ff_45%,_#fdf2f8_100%)] pt-36 pb-24">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [-20, 20, -20], y: [-10, 10, -10], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-20 top-[-8%] h-72 w-72 rounded-full bg-indigo-200/50 blur-[140px]"
          />
          <motion.div
            animate={{ x: [20, -20, 20], y: [10, -10, 10], scale: [1, 1.05, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-16 top-[12%] h-80 w-80 rounded-full bg-violet-200/50 blur-[140px]"
          />
        </div>

        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all resources
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
                </span>
                {resource.eyebrow}
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-slate-900 md:text-5xl">
                {resource.title}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {resource.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {resource.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white/80 px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-[32px] border border-slate-200/80 bg-white/80 p-7 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-slate-900">Why this helps</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{resource.summary}</p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="group mt-8 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
                >
                  Request the Resource Pack
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[32px] border border-slate-200/80 bg-slate-50/70 p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900">What teams gain</h3>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {resource.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-base leading-7 text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-slate-50 py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
                Common questions
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                About {resource.title}
              </h3>
            </motion.div>

            <div className="mt-10">
              <ResourceFAQ faqs={resource.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      <ResourcesCTA />
      <Footer />
    </>
  );
}
