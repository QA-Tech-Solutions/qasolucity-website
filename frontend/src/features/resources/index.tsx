import Footer from "@/features/home/components/footer";
import ResourcesHero from "./components/ResourcesHero";
import ResourcesOverview from "./components/ResourcesOverview";
import ResourcesCTA from "./components/ResourcesCTA";

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHero />
      <ResourcesOverview />
      <ResourcesCTA />
      <Footer />
    </>
  );
}
