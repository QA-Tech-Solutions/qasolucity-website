"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. What Are Cookies?",
    content: [
      "Cookies are small text files placed on your device when you visit a website. They help websites function properly and remember information about your visit.",
      "One thing covered here isn't a cookie in the strict technical sense: your light/dark theme preference is saved in your browser's local storage, not a cookie. We cover it in this policy anyway since it works the same way from your side, something small saved in your browser to remember a choice you made.",
    ],
  },
  {
    title: "2. What We Actually Use",
    content: [
      "We keep this simple. QA Solucity does not use advertising, marketing, or third-party analytics cookies, no Google Analytics, no ad trackers, nothing that follows you around the web.",
      "What we do use:",
      "• An authentication cookie, set only when someone logs into our admin tools, to keep that session signed in.",
      "• Your light/dark theme preference, saved in your browser's local storage so the site remembers your choice on your next visit.",
      "Neither of these tracks you across the web or builds a marketing profile.",
    ],
  },
  {
    title: "3. If This Changes",
    content: [
      "If we ever add analytics or marketing tools that use cookies, we'll update this page first and describe exactly what's added and why, rather than leaving this policy vague or out of date.",
    ],
  },
  {
    title: "4. Third-Party Sites",
    content: [
      "Some pages link out to our social media profiles or other external sites. Those third-party sites have their own cookie and privacy practices, which we don't control.",
      "We encourage you to review the privacy and cookie policies of any third-party site you visit.",
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
      "Blocking the authentication cookie described above only affects our admin tools; it won't change your experience browsing the public site.",
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

export default function CookiesContent() {
  return (
    <div className="relative -mt-16">
      <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30 md:p-12">
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
            QA Solucity uses a small number of cookies and similar technologies,
            only what&apos;s needed to keep the site working the way you&apos;d expect.
            This Cookie Policy explains what those are, how we use them, and
            your choices regarding them.
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

          <div className="mt-12 rounded-2xl bg-gradient-to-br from-indigo-50 dark:from-indigo-950/40 to-violet-50 dark:to-violet-950/40 p-6 text-sm text-slate-500 dark:text-slate-400">
            <p>
              <strong className="text-slate-700 dark:text-slate-300">Effective Date:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="mt-2">
              By continuing to use our website, you consent to our use of cookies
              in accordance with this Cookie Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}