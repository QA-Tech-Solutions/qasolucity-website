import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function FooterNewsletter() {
  return (
    <div>

      <h3 className="text-xl font-semibold">
        Stay Updated
      </h3>

      <p className="mt-4 leading-7 text-slate-400">
        Get QA insights, testing tips and company updates.
      </p>

      <div className="mt-8 space-y-4">

        <Input
          placeholder="Enter your email"
          className="h-14 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
        />

        <Button className="h-14 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700">

          Subscribe

          <ArrowRight className="ml-2 h-4 w-4" />

        </Button>

      </div>

    </div>
  );
}