import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BlogHeader from "./BlogHeader";
import BlogGrid from "./BlogGrid";

export default function Blog() {
  return (
    <Section className="relative overflow-hidden bg-[#FCFBF8] py-32">
      {/* Background Design */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-100/25 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-100/25 blur-3xl" />
        
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(252,251,248,0.8) 100%)",
          }}
        />
      </div>

      <Container>
        <BlogHeader />
        <div className="mt-20">
          <BlogGrid />
        </div>
      </Container>
    </Section>
  );
}