import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

export default function FeaturedCard() {
  return (
    <div className="flex h-full flex-col justify-between max-w-[300px] rounded-[28px] bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-white">
      <div>
        <span className="inline-flex w-fit rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur">
          Free Consultation
        </span>

        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          Not sure which QA service fits your needs?
        </h3>

        <p className="mt-4 text-sm leading-7 text-indigo-100">
          Speak with our team and get expert guidance on choosing the right testing
          strategy for your product.
        </p>
      </div>

      <Link href="/contact">
        <Button
            variant="secondary"
            className="mt-8 h-14 rounded-2xl bg-white px-6 text-base font-semibold text-indigo-700 hover:bg-slate-100"
          >
          Book Consultation
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}