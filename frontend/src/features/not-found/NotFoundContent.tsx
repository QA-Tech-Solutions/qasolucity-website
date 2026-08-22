"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bug, ArrowRight, Home } from "lucide-react";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function NotFoundContent() {
  return (
    <Section className="relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-b from-slate-100 dark:from-slate-800 via-white dark:via-slate-900 to-white dark:to-slate-900 pt-44 pb-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-28 top-24 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-[140px]"
        />
        <motion.div
          animate={{
            x: [20, -20, 20],
            y: [10, -10, 10],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -right-28 bottom-0 h-[550px] w-[550px] rounded-full bg-violet-200/30 blur-[180px]"
        />

        {/* Decorative dots */}
        <div className="absolute right-20 top-20 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-indigo-400" />
          ))}
        </div>
        <div className="absolute bottom-20 left-20 grid grid-cols-4 gap-3 opacity-20">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-violet-400" />
          ))}
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Badge className="group inline-flex items-center gap-3 rounded-full border-0 bg-white/80 dark:bg-slate-900/80 px-5 py-2.5 shadow-sm shadow-indigo-100/50 backdrop-blur-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md">
              <Bug className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
              404 Error
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
          </Badge>

          <p className="mt-10 bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-8xl font-black leading-none text-transparent md:text-9xl">
            404
          </p>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
            This page didn't pass QA.
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-slate-600 dark:text-slate-400">
            The page you're looking for doesn't exist, may have moved, or
            failed our quality check. Let's get you back on track.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/">
                <Button className="group h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="group h-14 rounded-2xl border-slate-300 dark:border-slate-700 px-8 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm">
            <span className="text-slate-400 dark:text-slate-500">Or try one of these:</span>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 px-4 py-1.5 font-medium text-slate-600 dark:text-slate-400 shadow-sm transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
