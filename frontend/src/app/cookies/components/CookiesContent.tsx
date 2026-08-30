"use client";

import { motion } from "framer-motion";
import { clearConsent, getConsent } from "@/features/analytics/lib/posthog";
import { useEffect, useState } from "react";

const sections = [
  {
    title: "1. What Are Cookies?",
    content: [
      "Cookies are small text files placed on your device when you visit a website. They help websites function properly and remember information about your visit.",
      "A couple of things covered here aren't cookies in the strict technical sense: your light/dark theme preference and your analytics choice below are both saved in your browser's local storage, not a cookie. We cover them here anyway since they work the same way from your side, something small saved in your browser to remember a choice you made.",
    ],
  },
  {
    title: "2. Essential Cookies (Always On)",
    content: [
      "These keep the site working and aren't optional:",
      "• An authentication cookie, set only when someone logs into our admin tools, to keep that session signed in.",
      "• Your light/dark theme preference, so the site remembers your choice on your next visit.",
    ],
  },
  {
    title: "3. Analytics (Optional, Off by Default)",
    content: [
      "We use PostHog, a product analytics tool, to understand how visitors use this site: which pages get viewed, general device/browser/approximate-location information, and whether key actions (like submitting the contact form or subscribing to our newsletter) happen. This helps us fix what's broken and improve what isn't.",
      "PostHog only loads if you click Accept on the cookie banner shown on your first visit. If you click Decline, or never respond, none of it loads and no analytics cookies are set.",
      "We don't use advertising or marketing cookies, and we don't sell this data or share it with third parties for their own marketing.",
    ],
  },
  {
    title: "4. Third-Party Sites",
    content: [
      "Some pages link out to our social media profiles or other external sites. Those third-party sites, and PostHog itself if you've accepted analytics, have their own privacy and cookie practices, which we don't control.",
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
      "Blocking the essential authentication cookie only affects our admin tools; it won't change your experience browsing the public site.",
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
        Your current analytics choice:{" "}
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
            QA Solucity uses a small number of cookies and similar technologies.
            Some keep the site working and are always on; analytics is optional
            and off until you say yes. This Cookie Policy explains what those
            are, how we use them, and your choices regarding them.
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
              Essential cookies apply automatically since the site can&apos;t function without
              them. Analytics only turns on if you explicitly accept it in the cookie banner,
              and you can change that choice at any time above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}