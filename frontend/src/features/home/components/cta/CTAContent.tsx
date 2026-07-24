import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function CTAContent() {
  return (
    <div className="max-w-3xl text-white">

      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur">
        Ready to Get Started?
      </span>

      <h2 className="mt-8 text-5xl font-bold leading-tight lg:text-6xl">
        Let's build software your users can trust.
      </h2>

      <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-300">
        Whether you're launching a new product, scaling an existing platform,
        or strengthening your QA process, our team is ready to help you
        deliver reliable software with confidence.
      </p>

      <div className="mt-12 flex flex-wrap gap-5">

        <Button
          className="h-14 rounded-2xl bg-white px-8 text-slate-900 hover:bg-slate-100"
        >
          Book a Consultation

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="h-14 rounded-2xl border-white/20 bg-transparent px-8 text-white hover:bg-white/10"
        >
          Contact Us
        </Button>

      </div>

    </div>
  );
}