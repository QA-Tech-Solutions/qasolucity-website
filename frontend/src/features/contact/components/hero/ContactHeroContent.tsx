"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactHeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-800/40 bg-indigo-50/50 dark:bg-indigo-950/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
        </span>
        Contact Us
      </div>

      <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl lg:text-6xl">
        Let's talk about your{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
          software quality.
        </span>{" "}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400 md:text-xl">
        Tell us what you're building, where you're facing challenges, 
        and what you need tested. Our QA team will help you identify the 
        right next step.
      </p>

      {/* Contact Actions - Email & WhatsApp */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <motion.a
          href="mailto:hello@qasolucity.com"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex h-14 items-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email Us
        </motion.a>

        <motion.a
          href="https://wa.me/2347080702920?text=Hello%20QA%20Solucity%2C%20I%27d%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex h-14 items-center rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-8 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-700 dark:hover:text-indigo-300"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp Us
        </motion.a>
      </motion.div>
    </motion.div>
  );
}