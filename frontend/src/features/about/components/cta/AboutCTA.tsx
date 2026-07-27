import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import AboutCTAContent from "./AboutCTAContent";
import AboutCTAHighlights from "./AboutCTAHighlights";

export default function AboutCTA() {
  return (
    <Section className="py-32">

      <Container>

        <div className="relative overflow-hidden rounded-[42px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 px-10 py-24 text-white shadow-[0_40px_100px_rgba(15,23,42,.45)] lg:px-20">

          {/* Glow */}

          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-[140px]" />

          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[180px]" />

          <div className="relative">

            <AboutCTAContent />

            <AboutCTAHighlights />

          </div>

        </div>

      </Container>

    </Section>
  );
}