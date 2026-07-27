import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionHeader from "./SectionHeader";
import ServiceGrid from "./ServiceGrid";

export default function Services() {
  return (
    <Section className="relative overflow-hidden bg-[#FAF8F4] py-32">
      {/* Background Design */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-indigo-100/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-100/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/40 blur-3xl" />

        {/* Subtle Grid */}
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

        {/* Radial Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(250,248,244,0.8) 100%)",
          }}
        />
      </div>

      <Container>
        <SectionHeader />
        <ServiceGrid />
      </Container>
    </Section>
  );
}