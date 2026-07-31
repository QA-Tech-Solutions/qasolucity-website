import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

import HeroActions from "./HeroActions";
import HeroBadge from "./HeroBadge";
import FadeIn from "@/components/shared/FadeIn";

export default function HeroContent() {
  return (
    <FadeIn>
      <div className="max-w-2xl">
        <HeroBadge />

        <div className="mt-6">
          <Heading
            as="h1"
            level="h1"
            className="max-w-3xl leading-[0.95] tracking-[-0.04em]"
          >
            Deliver Reliable Software with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Expert Quality Assurance.
            </span>
          </Heading>

          <Text
            className="mt-6 max-w-lg text-[18px] leading-8 text-muted-foreground"
          >
            QA Solucity partners with startups, enterprises, and product teams
            to deliver high-quality web, mobile, and API applications through
            expert quality assurance services.
          </Text>
        </div>

        <div className="mt-10">
          <HeroActions />
        </div>
      </div>
    </FadeIn>
  );
}