"use client";

import { Clock3, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    icon: Clock3,
    title: "Quick Response",
    description: "We'll review your enquiry and respond within one business day.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential Discussion",
    description: "NDA-friendly conversations for sensitive products and ideas.",
  },
  {
    icon: Sparkles,
    title: "Tailored Proposal",
    description: "We'll recommend the QA approach that best fits your goals.",
  },
];

export default function ContactInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-white via-white to-indigo-50/30 p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30"
    >
      {/* Decorative glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100/20 blur-3xl pointer-events-none" />

      <div className="relative">
        <span className="inline-flex rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
          Why QA Solucity
        </span>

        <h3 className="mt-6 text-3xl font-bold text-slate-900">What happens next?</h3>

        <div className="mt-8 space-y-6">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              className="group flex gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-indigo-50/50"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 transition-colors duration-300 group-hover:bg-indigo-100">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">{title}</h4>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Link href="/contact" className="block mt-8">
          <Button className="group h-12 w-full rounded-2xl border-indigo-200 bg-transparent text-indigo-600 transition-all duration-300 hover:bg-indigo-50 hover:border-indigo-300">
            Schedule a Call Instead
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}