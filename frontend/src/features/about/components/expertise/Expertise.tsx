import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import ExpertiseHeader from "./ExpertiseHeader";
import ExpertiseItem from "./ExpertiseItem";
import { expertise } from "./expertise-data";

export default function Expertise() {
  return (
    <Section className="py-32 bg-white">

      <Container>

        <ExpertiseHeader />

        <div className="mx-auto mt-24 max-w-7xl">

          {expertise.map((item) => (
            <ExpertiseItem
              key={item.title}
              {...item}
            />
          ))}

        </div>

      </Container>

    </Section>
  );
}