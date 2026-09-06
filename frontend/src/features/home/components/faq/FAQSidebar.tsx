"use client";

import { MessageSquare, Mail, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full self-start rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-white dark:from-slate-900 via-white dark:via-slate-900 to-indigo-50/30 dark:to-indigo-950/30 p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30 lg:sticky lg:top-28"
    >
      {/* Decorative Glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100/20 dark:bg-indigo-900/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-100/20 dark:bg-violet-900/20 blur-3xl" />

      <div className="relative">
        {/* Icon */}
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40">
          <MessageSquare className="h-7 w-7 text-white" />
        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Still have questions?
        </h3>

        <p className="mt-3 text-[15px] leading-7 text-slate-500 dark:text-slate-400">
          We're here to help. Reach out and we'll get back to you within 24 hours.
        </p>

        {/* Quick Stats */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 px-5 py-4">
            <Clock className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Response Time</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Within 24 hours</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 px-5 py-4">
            <Mail className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Us</p>
              <a
                href="mailto:hello@qasolucity.com"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                hello@qasolucity.com
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40 transition-all duration-300 hover:shadow-indigo-500/30 dark:hover:shadow-indigo-950/50"
        >
          Get in Touch
          <ArrowRight className="ml-2 h-4 w-4" />
        </motion.a>

        {/* Trust Badge */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Typically replies within 24 hours
        </div>
      </div>
    </motion.aside>
  );
}