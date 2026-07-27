import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import ContactHeroContent from "./ContactHeroContent";
import ContactHeroStats from "./ContactHeroStats";

export default function ContactHero() {
  return (
    <Section className="relative overflow-hidden pt-40 pb-28">

      {/* Background */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-indigo-100 blur-[160px]" />

        <div className="absolute right-0 top-32 h-[420px] w-[420px] rounded-full bg-violet-100 blur-[180px]" />

      </div>

      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-[1.2fr_420px]">

          <ContactHeroContent />

          <ContactHeroStats />

        </div>

      </Container>

    </Section>
  );
}