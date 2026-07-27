"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function CTAContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Let's Work Together
      </span>

      <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl lg:text-5xl">
        Ready to improve your{" "}
        <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
          software quality?
        </span>
      </h2>

      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
        Whether you're preparing for launch, scaling your engineering
        team, or strengthening your testing process, QA Solucity is
        ready to help you ship with confidence.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link href="/services">
            <Button className="group h-14 rounded-2xl bg-white px-8 text-slate-900 shadow-lg shadow-white/10 transition-all duration-300 hover:bg-slate-100 hover:shadow-white/20">
              Explore Our Services
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <a href="mailto:hello@qasolucity.com">
            <Button
              variant="outline"
              className="group h-14 rounded-2xl border-white/20 bg-transparent px-8 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
            >
              <Mail className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Email Us Directly
            </Button>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}