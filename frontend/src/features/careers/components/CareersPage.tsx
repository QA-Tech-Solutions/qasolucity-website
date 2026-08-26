import Footer from "@/features/home/components/footer";
import CareersHero from "./CareersHero";
import CareersCulture from "./CareersCulture";
import OpenPositions from "./OpenPositions";
import HiringProcess from "./HiringProcess";

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersCulture />
      <OpenPositions />
      <HiringProcess />
      <Footer />
    </>
  );
}
