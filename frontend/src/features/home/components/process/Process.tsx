import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ProcessHeader from "./ProcessHeader";
import ProcessTimeline from "./ProcessTimeline";
import { Sparkles, Circle, Hexagon } from "lucide-react";

export default function Process() {
  return (
    <Section className="relative overflow-hidden py-32">
      {/* === BACKGROUND DESIGN === */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/30 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-violet-100/40 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        
        {/* Floating Decorative Elements */}
        <Sparkles className="absolute left-[10%] top-[15%] h-6 w-6 text-indigo-300/50 animate-float" />
        <Circle className="absolute right-[10%] top-[25%] h-4 w-4 fill-violet-300/50 text-violet-300/50 animate-float-delayed" />
        <Hexagon className="absolute left-[15%] bottom-[30%] h-8 w-8 text-indigo-200/40 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute right-[20%] bottom-[20%] h-3 w-3 rounded-full bg-indigo-300/30 animate-float-delayed" style={{ animationDelay: "1s" }} />
        <Sparkles className="absolute left-[40%] top-[10%] h-4 w-4 text-violet-300/40 animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <Container>
        <ProcessHeader />
        <ProcessTimeline />
      </Container>
    </Section>
  );
}