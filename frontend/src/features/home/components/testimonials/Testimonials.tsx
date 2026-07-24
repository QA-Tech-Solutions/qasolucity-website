import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import TestimonialHeader from "./TestimonialHeader";
import TestimonialSlider from "./TestimonialSlider";

export default function Testimonials() {
  return (
    <Section className="relative overflow-hidden py-32">
      {/* Background Decorations – full width, no scroll */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Top-left glow – centered & scaled to avoid hard edges */}
        <div className="absolute left-1/2 top-10 -translate-x-1/2 w-[150%] max-w-[1200px] h-[500px] rounded-full bg-indigo-50/80 blur-3xl" />

        {/* Bottom-right glow */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[150%] max-w-[1400px] h-[600px] rounded-full bg-violet-50/80 blur-3xl" />

        {/* Subtle grid pattern – spans full width naturally */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(15,23,42,0.04)_100%)]" />
      </div>

      <Container>
        <TestimonialHeader />
        <div className="mt-20">
          <TestimonialSlider />
        </div>
      </Container>
    </Section>
  );
}