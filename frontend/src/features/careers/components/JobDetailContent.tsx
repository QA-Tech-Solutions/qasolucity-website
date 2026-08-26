"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  CalendarClock,
  Wallet,
  CheckCircle2,
  Star,
  Lock,
  Mail,
} from "lucide-react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ShareButtons from "@/components/blog/ShareButtons";
import Footer from "@/features/home/components/footer";
import JobCard from "./JobCard";
import WhoWeAre from "./WhoWeAre";
import JobApplicationForm from "./JobApplicationForm";
import type { CareerPosting } from "@/lib/careers";
import { isJobOpen } from "@/lib/careers-status";
import { WORK_MODE_STYLE, formatDeadline, isDeadlineSoon } from "../lib/workMode";

interface Props {
  job: CareerPosting;
  relatedJobs: CareerPosting[];
  children: ReactNode;
}

export default function JobDetailContent({ job, relatedJobs, children }: Props) {
  const isOpen = isJobOpen(job);
  const modeStyle = WORK_MODE_STYLE[job.workMode];
  const ModeIcon = modeStyle.icon;
  const deadlineLabel = formatDeadline(job.deadline);
  const deadlineSoon = isDeadlineSoon(job.deadline);

  const scrollToApply = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#fdf2f8_100%)] dark:bg-[linear-gradient(135deg,_#020617_0%,_#0b0f2e_50%,_#1a0e1f_100%)] pt-36 pb-16">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute left-[-6%] top-[-8%] h-72 w-72 rounded-full bg-indigo-200/50 blur-[140px]" />
          <div className="absolute right-[-4%] top-[12%] h-80 w-80 rounded-full bg-violet-200/50 blur-[140px]" />
        </div>

        <Container>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300 transition-colors hover:text-indigo-900 dark:hover:text-indigo-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all roles
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-8 max-w-3xl text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-300">
                {job.department}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold ${modeStyle.badgeClass}`}
              >
                <ModeIcon className="h-3.5 w-3.5" />
                {job.workMode}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <Briefcase className="h-3.5 w-3.5" />
                {job.type}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-[-0.03em] text-slate-900 dark:text-slate-100 md:text-4xl lg:text-5xl">
              {job.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              {job.salaryLabel && (
                <span className="flex items-center gap-1.5">
                  <Wallet className="h-4 w-4" />
                  {job.salaryLabel}
                </span>
              )}
              {deadlineLabel && (
                <span
                  className={`flex items-center gap-1.5 ${deadlineSoon ? "font-semibold text-amber-600 dark:text-amber-400" : ""}`}
                >
                  <CalendarClock className="h-4 w-4" />
                  Apply by {deadlineLabel}
                </span>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {isOpen ? (
                <a
                  href="#apply"
                  onClick={scrollToApply}
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 text-[15px] font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-500/30"
                >
                  Apply for this role
                </a>
              ) : (
                <span className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 px-7 text-[15px] font-semibold text-slate-500 dark:text-slate-400">
                  <Lock className="h-4 w-4" />
                  No longer accepting applications
                </span>
              )}
              <ShareButtons title={job.title} path={`/careers/${job.slug}`} />
            </div>
          </motion.div>
        </Container>
      </Section>

      <Section className="bg-white dark:bg-slate-900 py-16">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">About the role</h2>
              <article className="mt-4">{children}</article>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 p-7 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">What you&apos;ll do</h2>
              <ul className="mt-5 space-y-4">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                    <span className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 p-7 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                What we&apos;re looking for
              </h2>
              <ul className="mt-5 space-y-4">
                {job.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                    <span className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {job.niceToHave && job.niceToHave.length > 0 && (
              <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 p-7 sm:p-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Nice to have</h2>
                <ul className="mt-5 space-y-4">
                  {job.niceToHave.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Star className="mt-0.5 h-5 w-5 shrink-0 text-violet-500 dark:text-violet-400" />
                      <span className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Our hiring process</h2>
              <div className="relative mt-6">
                <div className="absolute bottom-2 left-[19px] top-2 w-px bg-slate-200 dark:bg-slate-800" />
                <ol className="space-y-6">
                  {job.hiringProcess.map((step, index) => (
                    <li key={step} className="relative flex items-start gap-4 pl-0">
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-500/20">
                        {index + 1}
                      </span>
                      <span className="mt-2 text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <WhoWeAre />

            <div id="apply" className="scroll-mt-28">
              {isOpen ? (
                <JobApplicationForm jobTitle={job.title} jobSlug={job.slug} />
              ) : (
                <div className="flex flex-col items-center gap-4 rounded-[28px] border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 px-8 py-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-slate-900 shadow-md ring-1 ring-slate-200/60 dark:ring-slate-700/60">
                    <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    This role is no longer accepting applications.
                  </h3>
                  <p className="max-w-md text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                    It&apos;s either been filled or the posting closed. Take a look at what else is
                    open, or send us your resume anyway.
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href="/careers"
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
                    >
                      See open roles
                    </Link>
                    <a
                      href="mailto:hello@qasolucity.com?subject=Speculative%20application"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <Mail className="h-4 w-4" />
                      Send resume anyway
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {relatedJobs.length > 0 && (
        <Section className="bg-slate-50 dark:bg-slate-950 py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                Other roles
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
                You might also like
              </h3>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedJobs.map((related, index) => (
                <JobCard key={related.slug} job={related} delay={index * 0.06} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Footer />
    </>
  );
}
