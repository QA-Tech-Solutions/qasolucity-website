import { ShieldCheck } from "lucide-react";

export default function WhoWeAre() {
  return (
    <div className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/70 p-7 sm:p-8">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
        <ShieldCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-slate-100">Who we are</h2>
      <p className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
        QA Solucity helps businesses test and improve their digital products, while creating
        pathways for aspiring and growing QA professionals through practical training,
        industry-recognized certification prep, and real-world opportunities. We work across
        manual testing, automation, API and performance testing, QA consulting, and training,
        which is exactly the range of work you&apos;ll be exposed to here.
      </p>
    </div>
  );
}
