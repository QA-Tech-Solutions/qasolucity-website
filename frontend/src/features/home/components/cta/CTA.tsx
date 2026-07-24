import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import CTAContent from "./CTAContent";
import CTAMetrics from "./CTAMetrics";

export default function CTA() {
  return (
    <Section className="relative overflow-hidden py-32">
      {/* Background */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950" />

      <div className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[150px]" />

      <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[180px]" />

      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-[1fr_380px]">

          <CTAContent />

          <CTAMetrics />

        </div>

      </Container>
    </Section>
  );
}