"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTAContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl text-white"
    >
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur-sm"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Ready to Get Started?
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-8 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
      >
        Let's build software{" "}
        <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
          your users can trust.
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-8 max-w-2xl text-base leading-9 text-slate-300 md:text-xl"
      >
        Whether you're launching a new product, scaling an existing platform,
        or strengthening your QA process, our team is ready to help you
        deliver reliable software with confidence.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 flex flex-wrap gap-5"
      >
        <Link
          href="/contact"
          className="group inline-flex h-14 items-center rounded-2xl bg-white px-8 text-slate-900 shadow-lg shadow-white/10 transition-transform duration-300 hover:scale-105 hover:bg-slate-100 hover:shadow-white/20 active:scale-95"
        >
          Book a Consultation
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>


        {/* <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            variant="outline"
            className="group h-14 rounded-2xl border-white/20 bg-transparent px-8 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/30"
          >
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button> */}
        {/* </motion.div> */}
      </motion.div>
    </motion.div>
  );
}