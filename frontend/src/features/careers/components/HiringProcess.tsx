"use client";

import { motion } from "framer-motion";
import { FileText, Search, PhoneCall, ClipboardCheck, Handshake } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

const STEPS = [
  {
    title: "Apply",
    description:
      "Submit your resume and a short note through the role's application form. No cover letter novels needed, just tell us why you're interested.",
    icon: FileText,
  },
  {
    title: "Application review",
    description:
      "We actually read every application ourselves. If your background looks like a fit, we'll reach out, usually within a few days.",
    icon: Search,
  },
  {
    title: "Intro call",
    description:
      "A relaxed 20 to 30 minute conversation about the role, your experience, and any questions you have about us.",
    icon: PhoneCall,
  },
  {
    title: "Practical exercise or trial",
    description:
      "Depending on the role, a short hands-on exercise or a paid trial session, so we can see how you actually work, not just how you interview.",
    icon: ClipboardCheck,
  },
  {
    title: "Offer",
    description:
      "If it's a fit on both sides, we'll make an offer and walk you through what happens next.",
    icon: Handshake,
  },
];

export default function HiringProcess() {
  return (
    <Section className="bg-white dark:bg-slate-900 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
            How we hire
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            A process that respects your time.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Steps can vary slightly by role, but this is roughly what to expect, no five-round
            marathons.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-2xl">
          <div className="absolute bottom-2 left-[23px] top-2 w-px bg-slate-200 dark:bg-slate-800" />
          <ol className="space-y-10">
            {STEPS.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex items-start gap-5"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md shadow-indigo-500/20">
                  <step.icon className="h-5 w-5 text-white" />
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
