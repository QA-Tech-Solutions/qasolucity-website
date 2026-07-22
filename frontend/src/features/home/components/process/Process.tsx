import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import ProcessCTA from "./ProcessCTA";
import ProcessHeader from "./ProcessHeader";
import ProcessPath from "./ProcessPath";
import ProcessCard from "./ProcessCard";

import { process } from "./process";

export default function Process() {
  return (
    <Section className="bg-[#FCFBF8] py-32">
      <Container>
        <ProcessCTA />

        <ProcessHeader />

        <div className="relative mt-28 hidden h-[700px] lg:block">
          <ProcessPath />

          <ProcessCard
            {...process[0]}
            className="left-0 top-20"
          />

          <ProcessCard
            {...process[1]}
            className="left-1/2 top-0 -translate-x-1/2"
          />

          <ProcessCard
            {...process[2]}
            className="right-0 top-64"
          />
        </div>
      </Container>
    </Section>
  );
}