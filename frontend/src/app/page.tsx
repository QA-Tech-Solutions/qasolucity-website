import Navbar from "@/features/navigation/components/Navbar";

import Hero from "@/features/home/components/hero/Hero";

import TechMarquee from "@/features/home/components/trusted-by/TechMarquee";
import TrustedBy from "@/features/home/components/trusted-by/TrustedBy";

import Services from "@/features/home/components/services";

import Process from "@/features/home/components/process";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <TechMarquee />

        <TrustedBy />

        <Process />

        <Services />
      </main>
    </>
  );
}