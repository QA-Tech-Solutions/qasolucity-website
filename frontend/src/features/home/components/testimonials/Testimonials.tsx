import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import TestimonialHeader from "./TestimonialHeader";
import TestimonialSlider from "./TestimonialSlider";

export default function Testimonials() {
  return (
    <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#fcfbf8_0%,_#f8f7ff_48%,_#fdf2f8_100%)] dark:bg-[linear-gradient(135deg,_#020617_0%,_#0b0f2e_50%,_#1a0e1f_100%)] py-32">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[150%] max-w-[1200px] h-[480px] rounded-full bg-indigo-100/70 dark:bg-indigo-900/30 blur-[140px]" />
        <div className="absolute left-1/2 bottom-[-8%] -translate-x-1/2 w-[150%] max-w-[1400px] h-[560px] rounded-full bg-violet-100/70 dark:bg-violet-900/30 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute inset-0 hidden opacity-[0.05] dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, #f1f5f9 1px, transparent 1px),
              linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(15,23,42,0.05)_100%)]" />
      </div>

      <Container>
        <div className="rounded-[20px] border border-white/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-[0_20px_6px_-28px_rgba(15,23,42,0.2)] backdrop-blur sm:py-12 sm:px-8 lg:p-10">
          <TestimonialHeader />
          <div className="mt-16">
            <TestimonialSlider />
          </div>
        </div>
      </Container>
    </Section>
  );
}