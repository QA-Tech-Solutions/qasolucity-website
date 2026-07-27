import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import ContactFAQAccordion from "./ContactFAQAccordion";
import ContactFAQHeader from "./ContactFAQHeader";

export default function ContactFAQ() {
  return (
    <Section className="bg-white py-28">

      <Container>

        <ContactFAQHeader />

        <ContactFAQAccordion />

      </Container>

    </Section>
  );
}