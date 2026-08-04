import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionHeader from "./SectionHeader";
import ServiceGrid from "./ServiceGrid";

export default function Services() {
  return (
    <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#faf8f4_0%,_#f7f3ff_48%,_#f8fafc_100%)] py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-[480px] w-[480px] rounded-full bg-indigo-100/50 blur-[140px]" />
        <div className="absolute bottom-[-8%] right-[-4%] h-[520px] w-[520px] rounded-full bg-violet-100/50 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(250,248,244,0.9)_100%)]" />
      </div>

      <Container>
        <div className="rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_20px_60px_-28px_rgba(15,23,42,0.24)] backdrop-blur sm:p-8">
          <SectionHeader />
          <div className="mt-10">
            <ServiceGrid />
          </div>
        </div>
      </Container>
    </Section>
  );
}