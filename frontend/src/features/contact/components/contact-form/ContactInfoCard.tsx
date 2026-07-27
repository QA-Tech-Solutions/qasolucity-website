import {
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function ContactInfoCard() {
  return (
    <div className="rounded-[36px] border border-slate-200 bg-slate-50 p-8">

      <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
        Why QA Solucity
      </span>

      <h3 className="mt-6 text-3xl font-bold text-slate-900">
        What happens next?
      </h3>

      <div className="mt-10 space-y-8">

        <div className="flex gap-4">
          <Clock3 className="mt-1 h-5 w-5 text-indigo-600" />

          <div>
            <h4 className="font-semibold">Quick Response</h4>

            <p className="mt-2 text-slate-600">
              We'll review your enquiry and respond within one business day.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <ShieldCheck className="mt-1 h-5 w-5 text-indigo-600" />

          <div>
            <h4 className="font-semibold">Confidential Discussion</h4>

            <p className="mt-2 text-slate-600">
              NDA-friendly conversations for sensitive products and ideas.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Sparkles className="mt-1 h-5 w-5 text-indigo-600" />

          <div>
            <h4 className="font-semibold">Tailored Proposal</h4>

            <p className="mt-2 text-slate-600">
              We'll recommend the QA approach that best fits your goals.
            </p>
          </div>
        </div>

      </div>

      <Button
        variant="outline"
        className="mt-10 h-12 w-full rounded-2xl"
      >
        Schedule a Call Instead
      </Button>

    </div>
  );
}