import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function HeroActions() {
  return (
    <div className="mt-10 flex flex-col gap-5 sm:flex-row">
      <Link href="/contact">
        <Button
          size="lg"
          className="h-14 rounded-2xl bg-indigo-600 px-8 text-[15px] font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/30"
        >
          Book a Consultation
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>

      <Link href="/services">
        <Button
          variant="outline"
          size="lg"
          className="h-14 rounded-2xl border-slate-300 bg-white px-8 text-[15px] font-semibold text-slate-800 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-white hover:shadow-md"
        >
          Explore Services
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}