import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import BenefitsBar from "./BenefitsBar";
import CertificationCards from "./CertificationCards";

export default function Certification() {
  return (
    <Section className="py-28 bg-white">
      <Container>
        <BenefitsBar />

        <CertificationCards />
      </Container>
    </Section>
  );
}