import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function ProcessCTA() {
  return (
    <div className="relative mb-28 overflow-hidden rounded-[36px] bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-14 py-12 text-white">
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            Let's Build Better Software
          </span>

          <h2 className="mt-6 max-w-2xl text-4xl font-bold leading-tight">
            Ready to improve your software quality with expert QA?
          </h2>

          <p className="mt-4 max-w-xl text-lg text-slate-300">
            From startups to enterprise platforms, we help teams deliver
            reliable software with confidence.
          </p>
        </div>

        <Button
          className="h-14 rounded-2xl bg-white px-8 text-slate-900 hover:bg-slate-100"
        >
          Book Consultation

          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}