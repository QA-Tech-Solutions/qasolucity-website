import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import TrustedByHeader from "./TrustedByHeader";
import TechnologyStack from "./TechnologyStack";
import ResourceCard from "./ResourceCard";

export default function TrustedBy() {
  return (
    <Section className="relative py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-32 h-72 w-72 rounded-full bg-indigo-50 blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-50 blur-[160px]" />
      </div>

      <Container>
        <TrustedByHeader />

        <div className="mt-20 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <TechnologyStack />
          
          <ResourceCard />
        </div>
      </Container>
    </Section>
  );
}