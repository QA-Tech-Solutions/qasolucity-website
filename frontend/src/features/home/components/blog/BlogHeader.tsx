import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function BlogHeader() {
  return (
    <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
          Latest Insights
        </span>

        <h2 className="mt-5 text-5xl font-bold leading-tight tracking-tight text-slate-900 lg:text-6xl">
          Expert insights on software quality and testing.
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Stay informed with practical guides, QA best practices,
          automation tips and industry trends from our experts.
        </p>
      </div>

      <Button
        variant="outline"
        className="h-14 rounded-2xl px-7"
      >
        View All Articles

        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}