import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import AboutHeroContent from "./AboutHeroContent";
import AboutHeroVisual from "./AboutHeroVisual";

export default function AboutHero() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-44 pb-32">

      {/* Background */}

      <div className="absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-28 top-24 h-[420px] w-[420px] rounded-full bg-indigo-100 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full bg-violet-100 blur-[180px]" />

      </div>

      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-[1.1fr_.9fr]">

          <AboutHeroContent />

          <AboutHeroVisual />

        </div>

      </Container>

    </Section>
  );
}