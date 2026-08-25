"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Mail, Ticket, GraduationCap } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CertificationDisclaimer from "./CertificationDisclaimer";
import type { Pathway } from "../data/certification-data";

interface StoredEnrollment {
  firstName: string;
  track: Pathway["track"];
  priceNgn: number;
  voucherAssigned: boolean;
  voucherCode: string | null;
}

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const PREP_STEPS = [
  {
    title: "Check your inbox",
    description:
      "Your class schedule and login details land in your email separately, usually within a few hours.",
  },
  {
    title: "Register with the official exam board",
    description:
      "When you're ready to sit your exam, create an account directly with the independent registrar — AT*SQA for most NGSTQB candidates, or iSQI for select tracks. QA Solucity has no role in this step.",
  },
  {
    title: "Buy your voucher & schedule a date",
    description:
      "Purchase your exam voucher directly from the registrar and pick a test window, online or at a test center. Most vouchers stay valid for booking within 365 days of purchase.",
  },
];

export default function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [enrollment, setEnrollment] = useState<StoredEnrollment | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("qas-certification-enrollment");
      // sessionStorage only exists on the client, so this can't run during
      // SSR — hydrating it straight into state (rather than a lazy
      // useState initializer) avoids a server/client markup mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setEnrollment(JSON.parse(raw) as StoredEnrollment);
    } catch {
      // Ignore — falls back to the generic, non-personalized view below.
    }
    setHydrated(true);
  }, []);

  const trackFromUrl = searchParams.get("track") === "bundle" ? "bundle" : "prep";
  const track = enrollment?.track ?? trackFromUrl;
  const firstName = enrollment?.firstName;
  const isBundle = track === "bundle";

  const bundleSteps = [
    { title: "Payment confirmed", description: "Your training seat and exam voucher are both locked in." },
    enrollment?.voucherCode
      ? {
          title: "Your voucher code is ready",
          description: `Your prepaid exam voucher code is ${enrollment.voucherCode}. Keep it safe — you'll enter it on the registrar's site when you book your test date.`,
        }
      : {
          title: "Your voucher is being issued",
          description:
            "Our team purchases and assigns your unique prepaid voucher code by hand, and emails it to you within 24 hours of payment confirmation.",
        },
    {
      title: "Redeem it with the registrar",
      description:
        "Use the code on the official registrar's site (AT*SQA or iSQI) to schedule your exam date, online or at a test center.",
    },
  ];

  const steps = isBundle ? bundleSteps : PREP_STEPS;

  return (
    <Section className="relative overflow-hidden bg-[#FCFBF8] dark:bg-[#020617] pt-40 pb-20">
      <Container className="max-w-2xl">
        {hydrated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30 md:p-10"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/40">
              <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {firstName ? `You're enrolled, ${firstName}!` : "You're enrolled!"}
            </h1>
            <p className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
              {isBundle
                ? "Your All-Inclusive Certification Bundle enrollment is confirmed. A confirmation with these details is also on its way to your inbox."
                : "Your Self-Starter Prep Track enrollment is confirmed. A confirmation with these details is also on its way to your inbox."}
            </p>
            {enrollment?.priceNgn && (
              <p className="mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Total: {nairaFormatter.format(enrollment.priceNgn)}
              </p>
            )}

            <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400">
              {isBundle ? <Ticket className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
              Next Steps Guide
            </div>

            <div className="mt-4 space-y-5">
              {steps.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">{step.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
              <Mail className="h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />
              Questions in the meantime? Reach us at{" "}
              <a href="mailto:hello@qasolucity.com" className="font-semibold text-indigo-600 dark:text-indigo-400">
                hello@qasolucity.com
              </a>
              .
            </div>

            <Link
              href="/certification"
              className="group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 bg-white dark:bg-slate-900 text-[15px] font-semibold text-indigo-600 dark:text-indigo-400 transition-all duration-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
            >
              Back to certification pathways
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}

        <div className="mt-10">
          <CertificationDisclaimer />
        </div>
      </Container>
    </Section>
  );
}
