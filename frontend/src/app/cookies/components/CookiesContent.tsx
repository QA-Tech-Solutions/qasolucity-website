"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. What Are Cookies?",
    content: [
      "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide useful information to website owners.",
      "Cookies enable websites to remember your actions and preferences over a period of time, so you don't have to keep re-entering them whenever you come back to the site.",
    ],
  },
  {
    title: "2. How We Use Cookies",
    content: [
      "QA Solucity uses cookies for the following purposes:",
      "• To provide essential website functionality",
      "• To remember your preferences and settings",
      "• To analyze how you use our website",
      "• To improve our services based on user behavior",
      "• To measure the effectiveness of our marketing",
    ],
  },
  {
    title: "3. Types of Cookies We Use",
    content: [
      "We use the following types of cookies:",
      "• Essential cookies – required for basic website functionality",
      "• Preference cookies – remember your choices and settings",
      "• Analytics cookies – help us understand how visitors interact with our site",
      "• Marketing cookies – used to deliver relevant content and measure campaign performance",
      "• Third-party cookies – from trusted partners (Google Analytics, etc.)",
    ],
  },
  {
    title: "4. Third-Party Cookies",
    content: [
      "We may use third-party services that place cookies on your device, including:",
      "• Google Analytics – for website analytics and performance tracking",
      "• Social media platforms – for sharing content and engagement",
      "• Calendly – for scheduling consultations",
      "These third parties have their own privacy policies and cookie practices.",
    ],
  },
  {
    title: "5. Your Cookie Choices",
    content: [
      "You can control and manage cookies in several ways:",
      "• Browser settings – most browsers allow you to block or delete cookies",
      "• Cookie consent – we provide options to accept or decline non-essential cookies",
      "• Opt-out tools – available for third-party analytics services",
      "Please note that blocking certain cookies may affect your experience on our website.",
    ],
  },
  {
    title: "6. How to Manage Cookies",
    content: [
      "You can manage your cookie preferences through your browser settings. Here are links to instructions for common browsers:",
      "• Google Chrome – Settings > Privacy and Security > Cookies",
      "• Mozilla Firefox – Options > Privacy & Security > Cookies",
      "• Safari – Preferences > Privacy > Cookies",
      "• Microsoft Edge – Settings > Cookies and Site Permissions",
    ],
  },
  {
    title: "7. Changes to This Policy",
    content: [
      "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated date.",
      "We encourage you to review this policy periodically.",
    ],
  },
  {
    title: "8. Contact Us",
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
            QA Solucity uses cookies and similar tracking technologies to improve
            your experience on our website. This Cookie Policy explains what
            cookies are, how we use them, and your choices regarding them.
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