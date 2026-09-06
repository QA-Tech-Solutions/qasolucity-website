import { ArrowRight, BadgeCheck, Download } from "lucide-react";

import { Button } from "@/components/ui/Button";

const resources = [
  "QA Test Plan Template",
  "Bug Report Template",
  "Test Case Template",
  "Regression Checklist",
];

export default function ResourceCard() {
  return (
    <div className="w-full self-start lg:sticky lg:top-28">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,.45)] sm:p-8">

          {/* Glow */}

          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

          <div className="relative">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Download className="h-5 w-5" />
              </div>

              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
                Free Resource
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-bold leading-tight">
              QA Starter Kit
            </h3>

            <p className="mt-6 leading-7 text-slate-300">
              Kick-start your next project with the same QA documents
              our engineers use during software delivery.
            </p>

            <div className="mt-6 space-y-3">

              {resources.map((resource) => (
                <div
                  key={resource}
                  className="flex items-center gap-3"
                >
                  <BadgeCheck className="h-5 w-5 text-emerald-400" />

                  <span className="text-slate-200">
                    {resource}
                  </span>
                </div>
              ))}

            </div>

            {/* Disabled for now - the starter kit isn't ready to ship yet.
                Re-enable by removing the disabled prop once it is. */}
            <Button
              disabled
              className="
                mt-8
                h-12
                w-full
                rounded-2xl
                bg-white
                text-slate-900
                hover:bg-slate-100
              "
            >
              Download Starter Kit

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="mt-4 text-center text-sm text-slate-400">
              Coming soon.
            </p>

          </div>
        </div>
    </div>
  );
}