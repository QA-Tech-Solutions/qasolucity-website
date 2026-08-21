"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Home, RotateCw } from "lucide-react";

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

interface Props {
  digest?: string;
  onRetry: () => void;
}

export default function ErrorContent({ digest, onRetry }: Props) {
  return (
    <Section className="relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-b from-slate-100 via-white to-white pt-44 pb-32">
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
          <Badge className="group inline-flex items-center gap-3 rounded-full border-0 bg-white/80 px-5 py-2.5 shadow-sm shadow-indigo-100/50 backdrop-blur-sm">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
              500 Error
            </span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
          </Badge>

          <p className="mt-10 bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-8xl font-black leading-none text-transparent md:text-9xl">
            500
          </p>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Something went wrong on our end.
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-slate-600">
            We hit an unexpected error while loading this page. Our team has
            been notified, please try again, or head back home.
          </p>

          {digest && (
            <p className="mt-4 font-mono text-xs text-slate-400">
              Error reference: {digest}
            </p>
          )}

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={onRetry}
                className="group h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
              >
                <RotateCw className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                Try Again
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/">
                <Button
                  variant="outline"
                  className="group h-14 rounded-2xl border-slate-300 px-8 transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm">
            <span className="text-slate-400">Or try one of these:</span>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-slate-200/80 bg-white px-4 py-1.5 font-medium text-slate-600 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md"
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
