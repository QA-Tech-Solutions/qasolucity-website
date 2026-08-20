import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import CertificationHeader from "./CertificationHeader";
import BenefitsBar from "./BenefitsBar";
import CertificationCards from "./CertificationCards";

export default function Certification() {
  return (
    <Section className="relative overflow-hidden bg-white py-28">
      {/* Background Design */}
      <div className="absolute inset-0 -z-10">
        {/* Top-left glow */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-indigo-100/30 blur-3xl" />
        
        {/* Bottom-right glow */}
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-100/30 blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container>
        <CertificationHeader />
        <BenefitsBar />
        <CertificationCards />
      </Container>
    </Section>
  );
}