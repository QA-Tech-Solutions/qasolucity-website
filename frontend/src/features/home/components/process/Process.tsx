import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ProcessHeader from "./ProcessHeader";
import ProcessTimeline from "./ProcessTimeline";

export default function Process() {
  return (
    <Section className="py-32">
      <Container>
     
         <ProcessHeader />
     
         <div className="mt-24">
             <ProcessTimeline />
         </div>
     
     </Container>
    </Section>
  );
}