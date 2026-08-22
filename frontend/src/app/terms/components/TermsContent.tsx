"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using the QA Solucity website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use our website or services.",
      "These terms apply to all visitors, users, and others who access or use our services.",
    ],
  },
  {
    title: "2. Description of Services",
    content: [
      "QA Solucity provides quality assurance services, including but not limited to:",
      "• Manual and automated testing",
      "• API and performance testing",
      "• QA consulting and strategy",
      "• Staff augmentation",
      "• DevOps and CI/CD integration",
      "• QA training and certification",
      "All services are delivered in accordance with the specific agreement signed between QA Solucity and the client.",
    ],
  },
  {
    title: "3. User Responsibilities",
    content: [
      "By using our website and services, you agree to:",
      "• Provide accurate and complete information",
      "• Maintain the confidentiality of any login credentials",
      "• Use our services only for lawful purposes",
      "• Not interfere with or disrupt our website or servers",
      "• Not attempt to gain unauthorized access to any part of our systems",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "All content, logos, designs, and materials on this website are the property of QA Solucity and are protected by copyright, trademark, and other intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written consent.",
      "Any deliverables created for clients during an engagement remain the property of the client upon full payment, unless otherwise agreed in writing.",
    ],
  },
  {
    title: "5. Payment Terms",
    content: [
      "Payment terms are specified in each individual service agreement or contract.",
      "Unless otherwise stated, invoices are due upon receipt and must be paid within the specified timeframe.",
      "Late payments may be subject to interest charges or suspension of services.",
    ],
  },
  {
    title: "6. Confidentiality",
    content: [
      "Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of engagement.",
      "Confidential information includes but is not limited to:",
      "• Business strategies and plans",
      "• Source code and technical specifications",
      "• Client data and user information",
      "• Any information marked as confidential",
      "This obligation survives the termination of any agreement.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      "QA Solucity provides services on an 'as is' and 'as available' basis. We make no warranties, expressed or implied, regarding the services provided.",
      "To the fullest extent permitted by law, QA Solucity shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.",
      "Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.",
    ],
  },
  {
    title: "8. Indemnification",
    content: [
      "You agree to indemnify and hold QA Solucity harmless from any claims, damages, losses, or expenses arising from your violation of these Terms & Conditions or your use of our services.",
    ],
  },
  {
    title: "9. Termination",
    content: [
      "We reserve the right to terminate or suspend your access to our website and services at any time, without notice, for conduct that violates these terms or is otherwise harmful to our business.",
      "Upon termination, your right to use our services will immediately cease.",
    ],
  },
  {
    title: "10. Governing Law",
    content: [
      "These Terms & Conditions shall be governed by and construed in accordance with the laws of Nigeria.",
      "Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Lagos, Nigeria.",
    ],
  },
  {
    title: "11. Changes to Terms",
    content: [
      "We reserve the right to update these Terms & Conditions at any time. Changes will be effective immediately upon posting on this page.",
      "We encourage you to review these terms periodically.",
    ],
  },
  {
    title: "12. Contact Information",
    content: [
      "If you have any questions about these Terms & Conditions, please contact us:",
      "📧 hello@qasolucity.com",
      "📍 Lagos, Nigeria",
    ],
  },
];

export default function TermsContent() {
  return (
    <div className="relative -mt-16">
      <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30 md:p-12">
        <div className="prose prose-lg prose-slate max-w-none">
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-400">
            Welcome to QA Solucity. By using our website and services, you agree
            to comply with and be bound by these Terms & Conditions. Please read
            them carefully before using our services.
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
              These Terms & Conditions apply to all users of the QA Solucity
              website and services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}