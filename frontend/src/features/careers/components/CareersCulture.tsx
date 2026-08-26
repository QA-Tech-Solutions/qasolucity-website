"use client";

import { motion } from "framer-motion";
import { GraduationCap, Globe2, Target, Users2, Layers, MessageCircle } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

const REASONS = [
  {
    title: "Real client work, not busywork",
    description:
      "You'll work on actual products for actual clients from early on, not shadow work while you wait to be trusted with something that matters.",
    icon: Target,
  },
  {
    title: "Remote-first, flexible by default",
    description:
      "Most roles are remote. We care about the work getting done well, not about tracking hours at a desk.",
    icon: Globe2,
  },
  {
    title: "A team that actually mentors",
    description:
      "Whether you're growing into QA or already deep in it, you'll have people around who'll actually teach, not just delegate and disappear.",
    icon: GraduationCap,
  },
  {
    title: "Small team, real ownership",
    description:
      "We're not big enough for your work to get lost in the noise. What you build and ship is visibly yours.",
    icon: Users2,
  },
  {
    title: "Exposure across the discipline",
    description:
      "Manual, automation, API, performance, consulting, training — we work across all of it, and so will you if you want to.",
    icon: Layers,
  },
  {
    title: "Direct, low-ego communication",
    description:
      "We'd rather have a blunt conversation early than a polite one too late. Good feedback moves fast here.",
    icon: MessageCircle,
  },
];

export default function CareersCulture() {
  return (
    <Section className="bg-white dark:bg-slate-900 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
            Why join us
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            What working here is actually like.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
                <reason.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">
                {reason.title}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
