import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import SectionHeader from "./SectionHeader";
import ServiceGrid from "./ServiceGrid";

export default function Services() {
  return (
    <Section className="bg-[#FAF8F4] py-32">
      <Container>
        <SectionHeader />

        <ServiceGrid />
      </Container>
    </Section>
  );
}