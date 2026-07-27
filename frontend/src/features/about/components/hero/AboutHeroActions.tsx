import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function AboutHeroActions() {
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
          Let's Work Together

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>

      <Link href="/services">
        <Button
          variant="outline"
          className="h-14 rounded-2xl px-8"
        >
          Explore Services
        </Button>
      </Link>

    </div>
  );
}