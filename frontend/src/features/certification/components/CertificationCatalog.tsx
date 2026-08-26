"use client";

import { motion } from "framer-motion";
import { GraduationCap, Clock } from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { certificationCatalog } from "../data/certification-data";

export default function CertificationCatalog() {
  return (
    <Section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
            What we prep you for
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Every ISTQB track we cover.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Tell us which certification you&apos;re targeting when you enroll, and our
            instructors tailor the syllabus, exercises, and mock exams to it.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {certificationCatalog.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-lg shadow-slate-200/40 dark:shadow-black/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
                <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-slate-100">
                {group.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {group.description}
              </p>

              <ul className="mt-6 space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                {group.items.map((item) => (
                  <li key={item.code} className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] leading-6 text-slate-700 dark:text-slate-300">
                        {item.name}
                      </span>
                      <span className="shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        {item.code}
                      </span>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                      <Clock className="h-3 w-3" />
                      {item.duration} of training
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
