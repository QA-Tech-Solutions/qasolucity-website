import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function CTAContent() {
  return (
    <div className="mx-auto max-w-4xl text-center">

      <span className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-300">
        Let's Work Together
      </span>

      <h2 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">

        Ready to improve your software quality?

      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">

        Whether you're preparing for launch, scaling your engineering
        team, or strengthening your testing process, QA Solucity is
        ready to help you ship with confidence.

      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-5">

        <Link href="/contact">
          <Button
            className="
              h-14
              rounded-2xl
              bg-white
              px-8
              text-slate-900
              hover:bg-slate-100
            "
          >
            Book Free Consultation

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <Link href="/services">
          <Button
            variant="outline"
            className="
              h-14
              rounded-2xl
              border-white/30
              bg-transparent
              px-8
              text-white
              hover:bg-white/10
            "
          >
            Explore Our Services
          </Button>
        </Link>

      </div>

    </div>
  );
}