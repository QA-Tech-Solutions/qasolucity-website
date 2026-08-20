import Hero from "@/features/home/components/hero/Hero";

import TechMarquee from "@/features/home/components/trusted-by/TechMarquee";
import TrustedBy from "@/features/home/components/trusted-by/TrustedBy";

import Services from "@/features/home/components/services";

import Process from "@/features/home/components/process";

import Certification from "@/features/home/components/certification";

import Testimonials from "@/features/home/components/testimonials";

import FAQ from "@/features/home/components/faq";

import CTA from "@/features/home/components/cta";

import Blog from "@/features/home/components/blog";

import Footer from "@/features/home/components/footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />

        <TechMarquee />

        <TrustedBy />

        <Process />

        <Services />

        <Certification />

        <Testimonials />

        <Blog />

        <FAQ />

        <CTA />
        
        <Footer />
        
      </main>
    </>
  );
}