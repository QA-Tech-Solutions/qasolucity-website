"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CertificationDisclaimer from "./CertificationDisclaimer";

const faqs = [
  {
    question: "Who actually administers and grades the exam?",
    answer:
      "An independent official exam board — for most NGSTQB candidates that's AT*SQA, though iSQI administers exams for some other ISTQB tracks. QA Solucity trains you; the registrar writes, proctors, scores, and certifies the exam itself. We have no role in that part.",
  },
  {
    question: "What does the exam actually look like?",
    answer:
      "For Foundation Level (CTFL), expect 40 multiple-choice questions in 60 minutes (75 minutes if you're sitting it in a non-native language), with a 65% pass mark and no negative marking. Format varies slightly for Advanced Level and specialist exams — we cover the specifics for your track in class.",
  },
  {
    question: "Can I take the exam online, or do I need a test center?",
    answer:
      "Both are usually available — most official registrars offer remote online proctoring as well as in-person test centers in major Nigerian cities. You choose whichever works for you when you book your slot.",
  },
  {
    question: "If I choose the Prep Track (Route A), how do I book my exam?",
    answer:
      "After your course, we hand you a short guide showing exactly where to create your account with the official registrar, buy your exam voucher directly from them, and schedule your date. Most vouchers stay valid for booking within 365 days of purchase.",
  },
  {
    question: "If I choose the Bundle (Route C), when do I get my voucher code?",
    answer:
      "Within 24 hours of your payment clearing, our team emails your prepaid official exam voucher code straight to the inbox you registered with, along with instructions for redeeming it on the registrar's site.",
  },
  {
    question: "Is the Naira price final?",
    answer:
      "The Prep Track's ₦180,000 training fee is fixed. The Bundle's price is recalculated from the live USD→NGN exchange rate (plus a small buffer for currency swings and processing costs) each time this page loads, so it can shift slightly day to day — the exact total is always shown before you pay.",
  },
];

export default function CertificationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="bg-white dark:bg-slate-900 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
              Good to know
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Questions before you enroll.
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => {
              const open = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    open
                      ? "border-indigo-200 dark:border-indigo-800/60 bg-white dark:bg-slate-900 shadow-lg shadow-indigo-100/30 dark:shadow-black/30"
                      : "border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        open
                          ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  {open && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-5 text-[15px] leading-7 text-slate-600 dark:text-slate-400"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <CertificationDisclaimer />
          </div>
        </div>
      </Container>
    </Section>
  );
}
