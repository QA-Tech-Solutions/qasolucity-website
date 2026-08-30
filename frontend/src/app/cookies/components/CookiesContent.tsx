"use client";

import { motion } from "framer-motion";
import { clearConsent, getConsent } from "@/features/analytics/lib/posthog";
import { useEffect, useState } from "react";

const sections = [
  {
    title: "1. What Are Cookies?",
    content: [
      "Cookies are small text files placed on your device when you visit a website. They help websites function properly and remember information about your visit.",
      "This policy also covers similar technologies, like your browser's local storage, which work the same way from your side: something small saved in your browser to remember a choice or preference you made.",
    ],
  },
  {
    title: "2. Necessary Cookies",
    content: [
      "These are required for the site to work properly, such as remembering your light/dark theme preference and keeping the site secure. They're always on and can't be switched off through our cookie banner.",
    ],
  },
  {
    title: "3. Cookies We Use",
    content: [
      "We use cookies and third-party analytics tools to:",
      "• Track session activity and usage patterns",
      "• Understand how visitors navigate and interact with our site",
      "• Measure the performance of our pages and features",
      "• Improve our website and services over time",
      "These cookies are optional and off by default. They only load if you accept them in the cookie banner shown on your first visit. If you decline, or don't respond, none of them load.",
      "We don't use advertising cookies, and we don't sell your information or share it with third parties for their own marketing.",
    ],
  },
  {
    title: "4. Third-Party Sites",
    content: [
      "Some pages link out to our social media profiles or other external sites, and our analytics tools are themselves operated by third parties. Those third parties have their own privacy and cookie practices, which we don't control.",
      "We encourage you to review the privacy and cookie policies of any third-party site or service you visit.",
    ],
  },
  {
    title: "5. Managing Cookies in Your Browser",
    content: [
      "You can control or delete cookies through your browser settings at any time. Here's where to find that setting in common browsers:",
      "• Google Chrome: Settings > Privacy and Security > Cookies",
      "• Mozilla Firefox: Options > Privacy & Security > Cookies",
      "• Safari: Preferences > Privacy > Cookies",
      "• Microsoft Edge: Settings > Cookies and Site Permissions",
      "Blocking necessary cookies may affect how parts of the site work.",
    ],
  },
  {
    title: "6. Changes to This Policy",
    content: [
      "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated date.",
      "We encourage you to review this policy periodically.",
    ],
  },
  {
    title: "7. Contact Us",
    content: [
      "If you have any questions about our Cookie Policy, please contact us:",
      "📧 hello@qasolucity.com",
      "📍 Lagos, Nigeria",
    ],
  },
];

function ManageConsent() {
  const [consent, setLocalConsent] = useState<"accepted" | "declined" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // One-time localStorage read on mount so server/client markup match
    // before this reveals the (per-browser) actual consent state.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setMounted(true);
    setLocalConsent(getConsent());
  }, []);

  if (!mounted) return null;

  return (
    <div className="mt-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 p-6">
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        Your current cookie preference:{" "}
        <span className={consent === "accepted" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}>
          {consent === "accepted" ? "Accepted" : consent === "declined" ? "Declined" : "Not yet chosen"}
        </span>
      </p>
      <button
        type="button"
        onClick={() => {
          clearConsent();
          window.location.reload();
        }}
        className="mt-3 inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        Change my cookie preferences
      </button>
    </div>
  );
}

export default function CookiesContent() {
  return (
    <div className="relative -mt-16">
      <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30 md:p-12">
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
            QA Solucity uses cookies and similar technologies to optimize your experience and to
            provide us insight into how visitors interact with our site. Some cookies are necessary
            and always on; others are optional and off until you say yes. This Cookie Policy explains
            what those are, how we use them, and your choices regarding them.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="border-b border-slate-100 dark:border-slate-800 pb-8 last:border-0 last:pb-0"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {section.title}
                </h2>
                {section.content.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`mt-4 text-[16px] leading-8 text-slate-600 dark:text-slate-400 ${
                      paragraph.startsWith("•") ? "pl-4" : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>

          <ManageConsent />

          <div className="mt-8 rounded-2xl bg-gradient-to-br from-indigo-50 dark:from-indigo-950/40 to-violet-50 dark:to-violet-950/40 p-6 text-sm text-slate-500 dark:text-slate-400">
            <p>
              <strong className="text-slate-700 dark:text-slate-300">Effective Date:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="mt-2">
              Necessary cookies apply automatically since the site can&apos;t function without
              them. Optional cookies only turn on if you explicitly accept them in the cookie
              banner, and you can change that choice at any time above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}