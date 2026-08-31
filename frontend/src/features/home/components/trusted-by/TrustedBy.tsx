import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import TrustedByHeader from "./TrustedByHeader";
import TechnologyStack from "./TechnologyStack";
import ResourceCard from "./ResourceCard";

export default function TrustedBy() {
  return (
    <Section className="relative py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Sized down on mobile: at desktop width a 288px blurred blob is a
            subtle touch, but on a ~390px phone screen it dominates the
            left side and washes out whatever text sits near it (the
            "Powered by..." heading, in this section's case). */}
        <div className="absolute left-0 top-32 h-40 w-40 sm:h-72 sm:w-72 rounded-full bg-indigo-50 dark:bg-indigo-950/40 blur-[70px] sm:blur-[120px]" />

        <div className="absolute right-0 bottom-0 h-44 w-44 sm:h-80 sm:w-80 rounded-full bg-violet-50 dark:bg-violet-950/30 blur-[90px] sm:blur-[160px]" />
      </div>

      <Container>
        <TrustedByHeader />

        <div className="mt-16 grid items-start gap-8 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <TechnologyStack />
          
          <ResourceCard />
        </div>
      </Container>
    </Section>
  );
}