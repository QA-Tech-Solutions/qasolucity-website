"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "We collect information you provide directly to us, such as when you fill out a contact form, request a consultation, or communicate with us via email.",
      "This may include your name, email address, phone number, company name, and any other information you choose to provide.",
      "We also collect information automatically when you visit our website, including your IP address, browser type, device information, and pages you interact with.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use the information we collect to:",
      "• Provide, maintain, and improve our services",
      "• Respond to your inquiries and requests",
      "• Send you technical notices, updates, and marketing communications",
      "• Analyze website usage and improve user experience",
      "• Comply with legal obligations",
    ],
  },
  {
    title: "3. Information Sharing",
    content: [
      "We do not sell, trade, or rent your personal information to third parties.",
      "We may share your information with trusted service providers who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep your information confidential.",
      "We may also share information when required by law or to protect our rights.",
    ],
  },
  {
    title: "4. Cookies & Tracking Technologies",
    content: [
      "We use cookies and similar tracking technologies to enhance your experience on our website.",
      "Cookies help us understand how you interact with our site, remember your preferences, and improve our services.",
      "You can control cookie settings in your browser. However, disabling cookies may affect some features of our website.",
      "For more details, please see our Cookie Policy.",
    ],
  },
  {
    title: "5. Data Security",
    content: [
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      "However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.",
    ],
  },
  {
    title: "6. Data Retention",
    content: [
      "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.",
      "You may request deletion of your personal information at any time.",
    ],
  },
  {
    title: "7. Your Rights",
    content: [
      "Depending on your location, you may have the following rights regarding your personal information:",
      "• Access – request a copy of your data",
      "• Correction – update inaccurate data",
      "• Deletion – request removal of your data",
      "• Restriction – limit how we use your data",
      "• Portability – receive your data in a portable format",
      "To exercise these rights, please contact us at hello@qasolucity.com.",
    ],
  },
  {
    title: "8. Third-Party Links",
    content: [
      "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites.",
      "We encourage you to review the privacy policies of any third-party sites you visit.",
    ],
  },
  {
    title: "9. Children's Privacy",
    content: [
      "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children.",
      "If we become aware that we have collected personal information from a child without parental consent, we will take steps to remove it.",
    ],
  },
  {
    title: "10. Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.",
      "We encourage you to review this Privacy Policy periodically.",
    ],
  },
  {
    title: "11. Contact Us",
    content: [
      "If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:",
      "📧 hello@qasolucity.com",
      "📍 Lagos, Nigeria",
    ],
  },
];

export default function PrivacyContent() {
  return (
    <div className="relative -mt-16">
      <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30 md:p-12">
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
            At QA Solucity, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, and safeguard your data when
            you interact with our website and services.
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
              This Privacy Policy applies to all information collected through
              the QA Solucity website and related services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}