import AboutHero from "./components/hero";
import OurStory from "./components/our-story";
import TwoSides from "./components/two-sides";
import Journey from "./components/journey";
import Principles from "./components/principles";
import Capabilities from "./components/capabilities";

import AboutCTA from "./components/cta";

import Footer from "@/features/home/components/footer";

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <OurStory />

      <TwoSides />

      <Journey />

      <Principles />

      <Capabilities />

      <AboutCTA />

      <Footer />
    </>
  );
}
