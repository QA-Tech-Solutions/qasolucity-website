import { ShieldAlert } from "lucide-react";

export default function CertificationDisclaimer() {
  return (
    <div className="rounded-3xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40">
          <ShieldAlert className="h-5 w-5 text-amber-700 dark:text-amber-400" />
        </div>
        <div className="text-sm leading-7 text-slate-600 dark:text-slate-400">
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Independent training disclaimer
          </p>
          <p className="mt-2">
            ISTQB® and Certified Tester® are registered trademarks of the International
            Software Testing Qualifications Board, and NGSTQB is the Nigerian Software
            Testing Qualifications Board, ISTQB&apos;s recognized national board for Nigeria.
            QA Solucity is an independent training provider. We are{" "}
            <strong className="font-semibold text-slate-800 dark:text-slate-200">
              not an official partner, accredited center, or authorized testing provider
            </strong>{" "}
            of ISTQB or NGSTQB, and this page is not endorsed by either organization.
          </p>
          <p className="mt-3">
            The official certification exam itself is written, administered, and proctored
            entirely by independent, globally recognized exam boards (such as AT*SQA or
            iSQI). QA Solucity has no role in writing, administering, scoring, or issuing
            the exam or the certificate. Our Self-Starter Prep Track and All-Inclusive
            Certification Bundle are preparation programs only; the Bundle&apos;s prepaid
            voucher is a reimbursement of the registrar&apos;s own exam fee, purchased on
            your behalf under your name for your convenience.
          </p>
        </div>
      </div>
    </div>
  );
}
