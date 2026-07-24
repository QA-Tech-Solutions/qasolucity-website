import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import BlogHeader from "./BlogHeader";
import BlogGrid from "./BlogGrid";

export default function Blog() {
  return (
    <Section className="relative bg-[#FCFBF8] py-32">
      <Container>
        <BlogHeader />

        <div className="mt-20">
          <BlogGrid />
        </div>
      </Container>
    </Section>
  );
}