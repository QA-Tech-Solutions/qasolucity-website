import Footer from "@/features/home/components/footer";
import SolutionsHero from "./components/SolutionsHero";
import SolutionsOverview from "./components/SolutionsOverview";
import SolutionsCTA from "./components/SolutionsCTA";

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionsOverview />
      <SolutionsCTA />
      <Footer />
    </>
  );
}
