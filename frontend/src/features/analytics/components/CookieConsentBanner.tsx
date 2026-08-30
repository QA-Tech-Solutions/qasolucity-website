"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";
import { getConsent, setConsent } from "../lib/posthog";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Consent is decided (or not) per-browser via localStorage, nothing to
    // check on the server, so this only runs client-side after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time localStorage read on mount, not a value with an external subscription to sync
    setVisible(getConsent() === null);
  }, []);

  const decide = (status: "accepted" | "declined") => {
    setConsent(status);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
          role="region"
          aria-label="Cookie consent"
        >
          <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xl shadow-slate-900/10 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40">
                <Cookie className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                We&apos;d like to use privacy-friendly analytics (PostHog) to understand how people use this
                site, no ads, no selling data. It only turns on if you say yes. See our{" "}
                <Link href="/cookies" className="font-medium text-indigo-600 dark:text-indigo-400 underline underline-offset-2">
                  Cookie Policy
                </Link>{" "}
                for details.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:ml-auto">
              <button
                type="button"
                onClick={() => decide("declined")}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 transition-colors duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
