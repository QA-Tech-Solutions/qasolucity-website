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
            Ship with Confidence.{" "} <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              We find what breaks{" "}
            </span>
            before users do
          </Heading>

          <Text
            className="mt-6 max-w-lg text-[17px] leading-8 text-muted-foreground"
          >
            QA Solucity tests web, mobile and API products to uncover the bugs, gaps and risks that can hurt your users, revenue and reputation.
          </Text>
        </div>

        <div className="mt-10">
          <HeroActions />
        </div>
      </div>
    </FadeIn>
  );
}