import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <Section className="relative overflow-hidden bg-[#FCFBF8] pt-28 pb-24 lg:min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Center Glow */}
        <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-100/35 blur-[140px]" />

        {/* Left Glow */}
        <div className="absolute -left-56 top-10 h-[700px] w-[700px] rounded-full bg-slate-100/70 blur-[140px]" />

        {/* Right Glow */}
        <div className="absolute -right-52 top-20 h-[650px] w-[650px] rounded-full bg-violet-100/50 blur-[140px]" />

        {/* Bottom Glow */}
        <div className="absolute left-1/2 bottom-[-320px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-orange-50/60 blur-[150px]" />

        {/* Soft Accent */}
        <div className="absolute right-1/4 top-1/3 h-56 w-56 rounded-full bg-indigo-200/20 blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(15 23 42 / 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(15 23 42 / 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial Fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 20%, rgba(252,251,248,0.55) 75%, #FCFBF8 100%)",
          }}
        />
      </div>

      <Container>
        <div className="grid min-h-[82vh] items-center gap-20 lg:grid-cols-12">
          <div className="order-1 lg:col-span-7">
            <HeroContent />
          </div>

          <div className="order-2 mt-16 lg:col-span-5 lg:mt-0">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}