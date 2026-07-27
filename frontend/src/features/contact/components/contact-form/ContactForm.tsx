import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import ContactFormCard from "./ContactFormCard";
import ContactInfoCard from "./ContactInfoCard";
import FormHeader from "./FormHeader";

export default function ContactForm() {
  return (
    <Section className="py-28">

      <Container>

        <FormHeader />

        <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">

          <ContactFormCard />

          <ContactInfoCard />

        </div>

      </Container>

    </Section>
  );
}