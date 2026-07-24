import { ArrowRight, Clock3, ShieldCheck, Phone } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function FAQSidebar() {
  return (
    
      <aside className="sticky top-28">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 p-10 text-white shadow-[0_35px_90px_rgba(79,70,229,.35)]">

          {/* Glow */}

          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-violet-400/20 blur-3xl" />

          <div className="relative">

            <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur">
              Need More Help?
            </span>

            <h3 className="mt-6 text-3xl font-bold leading-tight">
              Still have questions?
            </h3>

            <p className="mt-5 leading-8 text-indigo-100">
              Our QA specialists are ready to discuss your product,
              testing strategy and release goals.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-start gap-4">
                <Clock3 className="mt-1 h-5 w-5 text-indigo-200" />

                <div>
                  <h4 className="font-semibold">
                    Quick Response
                  </h4>

                  <p className="mt-1 text-sm text-indigo-100">
                    We'll respond within one business day.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 h-5 w-5 text-indigo-200" />

                <div>
                  <h4 className="font-semibold">
                    NDA Friendly
                  </h4>

                  <p className="mt-1 text-sm text-indigo-100">
                    Your product and data remain confidential.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 text-indigo-200" />

                <div>
                  <h4 className="font-semibold">
                    Free Consultation
                  </h4>

                  <p className="mt-1 text-sm text-indigo-100">
                    Speak directly with a QA expert.
                  </p>
                </div>
              </div>

            </div>

            <Button
              className="
                mt-12
                h-14
                w-full
                rounded-2xl
                bg-white
                text-indigo-700
                hover:bg-slate-100
              "
            >
              Book Consultation

              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

          </div>
        </div>
    </aside>
  );
}