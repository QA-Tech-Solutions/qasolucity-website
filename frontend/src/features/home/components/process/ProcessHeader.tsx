import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function ProcessHeader() {
  return (
    <div className="max-w-md">
      <span className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
        OUR PROCESS
      </span>

      <h2 className="mt-5 text-5xl font-bold leading-tight tracking-tight text-slate-900">
        A proven QA workflow built for modern products.
      </h2>

      <p className="mt-6 text-lg leading-8 text-slate-600">
        Every engagement follows a structured quality assurance process—
        from understanding your product to continuous optimization after
        release.
      </p>

      <Button
        className="
          mt-10
          h-14
          rounded-2xl
          bg-indigo-600
          px-8
          font-semibold
          shadow-lg
          shadow-indigo-500/20
          hover:bg-indigo-700
        "
      >
        Discuss Your Project

        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}