import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function AboutCTAContent() {
  return (
    <div className="mx-auto max-w-4xl text-center">

      <span className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-300">
        Let's Build Together
      </span>

      <h2 className="mt-6 text-5xl font-bold leading-tight lg:text-6xl">

        Great software starts with great quality.

      </h2>

      <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">

        Whether you're launching your first product or scaling an
        enterprise platform, QA Solucity is ready to become your
        trusted quality engineering partner.

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
            Start Your Project

            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <Link href="/services">
          <Button
            variant="outline"
            className="
              h-14
              rounded-2xl
              border-white/20
              bg-transparent
              px-8
              text-white
              hover:bg-white/10
            "
          >
            Explore Services
          </Button>
        </Link>

      </div>

    </div>
  );
}