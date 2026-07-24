import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import FAQAccordion from "./FAQAccordion";
import FAQHeader from "./FAQHeader";
import FAQSidebar from "./FAQSidebar";

export default function FAQ() {
  return (
    <Section className="relative bg-[#FCFBF8] py-32">
      {/* Background */}

      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-0 top-20 h-[450px] w-[450px] rounded-full bg-indigo-100 blur-[140px]" />

        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-100 blur-[170px]" />
      </div>

      <Container>
        <FAQHeader />

        <div className="mt-20 flex items-start gap-20">

          {/* Left */}

          <div className="flex-1">
            <FAQAccordion />
          </div>

          {/* Right */}

          <div className="hidden w-[380px] shrink-0 lg:block">
            <FAQSidebar />
          </div>

        </div>
      </Container>
    </Section>
  );
}