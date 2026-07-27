import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/Button";

import Link from "next/link";

export default function ContactHeroActions() {
  return (
    <div className="mt-12 flex flex-wrap gap-5">

      <Link href="/contact">
        <Button
          className="
            h-14
            rounded-2xl
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            px-8
            text-white
          "
        >
          Book Consultation

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
       </Link>

      <Button
        variant="outline"
        className="
          h-14
          rounded-2xl
          border-slate-300
          px-8
        "
      >
        <Mail className="mr-2 h-4 w-4" />

        hello@qasolucity.com

      </Button>

    </div>
  );
}