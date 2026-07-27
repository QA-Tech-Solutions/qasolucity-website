import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import Principle from "./Principle";
import PrinciplesHeader from "./PrinciplesHeader";
import { principles } from "./principles-data";

export default function Principles() {
  return (
    <Section className="bg-slate-50 py-32">

      <Container>

        <PrinciplesHeader />

        <div className="mx-auto mt-24 max-w-6xl">

          {principles.map((principle, index) => (
            <Principle
              key={principle.title}
              index={index}
              {...principle}
            />
          ))}

        </div>

      </Container>

    </Section>
  );
}