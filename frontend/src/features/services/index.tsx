import Footer from "@/features/home/components/footer";
import Process from "@/features/home/components/process";
import ServicesHero from "./components/ServicesHero";
import ServicesOverview from "./components/ServicesOverview";
import ServicesCTA from "./components/ServicesCTA";

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesOverview />
      <Process />
      <ServicesCTA />
      <Footer />
    </>
  );
}
