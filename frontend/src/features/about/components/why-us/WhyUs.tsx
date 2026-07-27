import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import WhyUsFeature from "./WhyUsFeature";
import WhyUsHeader from "./WhyUsHeader";
import { whyUs } from "./why-us-data";

export default function WhyUs() {
  return (
    <Section className="bg-white py-32">

      <Container>

        <WhyUsHeader />

        <div className="mt-24">

          {whyUs.map((item) => (
            <WhyUsFeature
              key={item.number}
              {...item}
            />
          ))}

        </div>

      </Container>

    </Section>
  );
}