"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Rocket,
  BookOpenCheck,
  FlaskConical,
  Bot,
  Award,
  Laptop,
  Wifi,
  Smartphone,
  Clock,
  MessageCircle,
} from "lucide-react";
import ServiceFAQ from "@/features/services/components/ServiceFAQ";
import Footer from "@/features/home/components/footer";
import LaunchpadEnrollmentForm from "./LaunchpadEnrollmentForm";
import { getServiceBySlug } from "@/features/services/data/services";

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

// Indicative one-time program fee - same "confirm before launch" caveat as
// the rest of the site's pricing until the business locks in a final rate.
const PROGRAM_FEE_NGN = 100_000;
const PROGRAM_DURATION = "8 to 10 weeks";

const REQUIREMENTS = [
  {
    title: "A laptop or desktop computer",
    description: "You'll need your own computer to follow along with live sessions and do the hands-on work. A phone or tablet alone won't be enough.",
    icon: Laptop,
  },
  {
    title: "A stable internet connection",
    description: "Live sessions and mentor check-ins happen online, so a reasonably reliable connection matters more than a fast one.",
    icon: Wifi,
  },
  {
    title: "A smartphone",
    description: "For WhatsApp/community updates and coordinating with your mentor between sessions.",
    icon: Smartphone,
  },
  {
    title: "A few hours a week",
    description: "Expect to commit time outside live sessions for practice and project work. Consistency matters more than raw hours.",
    icon: Clock,
  },
  {
    title: "No prior tech experience needed",
    description: "We start from zero. Basic computer literacy (browsing, email, installing apps) is all the technical background you need.",
    icon: CheckCircle2,
  },
  {
    title: "Comfort asking questions",
    description: "This is mentor-led, not a video course. The beginners who get the most out of it are the ones who show up and ask.",
    icon: MessageCircle,
  },
];

const CURRICULUM_PHASES = [
  {
    phase: "Phase 1",
    title: "Testing Foundations",
    description:
      "The SDLC, how testing fits into it, test case design, defect reporting, and getting comfortable with tools like Jira.",
    icon: BookOpenCheck,
  },
  {
    phase: "Phase 2",
    title: "Manual Testing in Practice",
    description:
      "Exploratory and scripted testing, test plans, cross-browser and device coverage, and the usability and accessibility basics every tester needs.",
    icon: FlaskConical,
  },
  {
    phase: "Phase 3",
    title: "Test Automation",
    description:
      "Automation fundamentals with Selenium and Playwright, writing and running automated suites, and enough API testing (Postman) and CI/CD basics to be useful on a real team.",
    icon: Bot,
  },
  {
    phase: "Phase 4",
    title: "Portfolio & Interview Prep",
    description:
      "A capstone project you build end to end, portfolio review, and interview preparation so you can walk into QA interviews with something real to show.",
    icon: Award,
  },
];

export default function LaunchpadPage() {
  const service = getServiceBySlug("qa-career-launchpad");
  if (!service) return null;

  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#f8f7ff_0%,_#eef2ff_45%,_#fdf2f8_100%)] dark:bg-[linear-gradient(135deg,_#020617_0%,_#0b0f2e_50%,_#1a0e1f_100%)] pt-36 pb-24">
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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-800/40 bg-white/70 dark:bg-slate-900/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400 backdrop-blur-sm">
                <Rocket className="h-3.5 w-3.5" />
                {service.eyebrow}
              </div>

              {/* text-4xl (not 5xl) through the `lg` range specifically -
                  that's exactly where the 2-column grid above kicks in but
                  the left column is still narrow, so a bigger size wrapped
                  this heading to a second line and made this column taller
                  than the "Program fee" card next to it. Sizing back up at
                  `xl`, once the column actually has room, keeps it on one
                  line at every width instead. */}
              <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-slate-900 dark:text-slate-100 md:text-5xl lg:text-4xl xl:text-5xl">
                Become a QA engineer. From scratch.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                {service.description} No coding background or CS degree required, just the willingness to
                show up and practice.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {service.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-[32px] border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 p-7 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
                <service.icon className="h-6 w-6" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100">Program fee</h2>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">
                {nairaFormatter.format(PROGRAM_FEE_NGN)}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                one-time · {PROGRAM_DURATION} · indicative price, confirmed when you enroll · payment plans
                available
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#enroll"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group mt-8 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Curriculum */}
      <Section className="bg-white dark:bg-slate-900 py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Four phases, one job-ready QA engineer.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
              Typically completed over {PROGRAM_DURATION} alongside live mentor-led sessions and hands-on
              project work, not a self-paced video course you forget about halfway through.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {CURRICULUM_PHASES.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex gap-5 rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 p-7"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
                  <item.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
                    {item.phase}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Requirements */}
      <Section className="bg-white dark:bg-slate-900 py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
              Before you apply
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              What you need to get started.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
              No technical background required, just these basics, and the willingness to show up and
              practice.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REQUIREMENTS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40">
                  <item.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="mt-4 font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Outcomes / Deliverables / Tools / Best fit for */}
      <Section className="bg-slate-50 dark:bg-slate-950 py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[32px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">What you can expect</h3>
              <ul className="mt-6 space-y-4">
                {service.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-base leading-7 text-slate-600 dark:text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[32px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">What&apos;s included</h3>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                    <span className="text-base leading-7 text-slate-600 dark:text-slate-400">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 rounded-[32px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Tools &amp; skills you&apos;ll use</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/40 px-4 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 rounded-[32px] border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-8 text-white shadow-[0_24px_70px_-26px_rgba(15,23,42,0.4)]"
          >
            <h3 className="text-2xl font-bold">Best fit for</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {service.idealFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/10 dark:bg-slate-800/30 px-4 py-2 text-sm text-slate-100"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-white dark:bg-slate-900 py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                Common questions
              </p>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
                About the QA Career Launchpad
              </h3>
            </motion.div>

            <div className="mt-10">
              <ServiceFAQ faqs={service.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* Enrollment */}
      <Section id="enroll" className="bg-slate-50 dark:bg-slate-950 py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
              Ready to start?
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Start your QA career.
            </h2>
          </motion.div>

          <div className="mx-auto mt-10 max-w-xl">
            <LaunchpadEnrollmentForm />
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
