import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import StoryContent from "./StoryContent";
import StoryVisual from "./StoryVisual";

export default function OurStory() {
  return (
    <Section className="py-32">

      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-[1.2fr_.8fr]">

          <StoryContent />

          <StoryVisual />

        </div>

      </Container>

    </Section>
  );
}