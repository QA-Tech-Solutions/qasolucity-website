import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function ProcessHeader() {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 px-3 py-1 text-xs font-semibold text-indigo-600 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600"></span>
        </span>
        OUR PROCESS
      </div>

      <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        A proven QA workflow built for modern products.
      </h2>

      <p className="mt-6 text-lg leading-8 text-slate-600">
        Every engagement follows a structured quality assurance process,
        from understanding your product to continuous optimization after
        release.
      </p>

      <Button className="mt-10 h-14 rounded-2xl bg-indigo-600 text-white px-8 font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700">
        Discuss Your Project
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}