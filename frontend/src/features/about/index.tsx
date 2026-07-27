import AboutHero from "./components/hero";
import OurStory from "./components/our-story";
import WhyUs from "./components/why-us";
import Principles from "./components/principles";
import Expertise from "./components/expertise";

import Process from "@/features/home/components/process";

import AboutCTA from "./components/cta";

import Footer from "@/features/home/components/footer";

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <OurStory />

      <WhyUs />

      <Principles />

      <Expertise />

      <Process />

      <AboutCTA />

      <Footer />
    </>
  );
}