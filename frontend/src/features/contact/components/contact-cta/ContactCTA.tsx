import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import CTAContent from "./CTAContent";
import CTAMetrics from "./CTAMetrics";

export default function ContactCTA() {
  return (
    <Section className="py-32">

      <Container>

        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 px-10 py-20 text-white shadow-[0_40px_100px_rgba(15,23,42,.45)] lg:px-20">

          {/* Background Glow */}

          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-[120px]" />

          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[160px]" />

          <div className="relative">

            <CTAContent />

            <CTAMetrics />

          </div>

        </div>

      </Container>

    </Section>
  );
}