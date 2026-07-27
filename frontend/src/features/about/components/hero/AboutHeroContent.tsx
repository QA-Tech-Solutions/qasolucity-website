import AboutHeroActions from "./AboutHeroActions";
import AboutHeroBadge from "./AboutHeroBadge";

export default function AboutHeroContent() {
  return (
    <div>

      <AboutHeroBadge />

      <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-slate-900 lg:text-7xl">

        Building confidence through quality engineering.

      </h1>

      <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-600">

        QA Solucity partners with startups, scale-ups and enterprise
        teams to build reliable software through modern quality
        assurance, automation and quality engineering practices.

      </p>

      <AboutHeroActions />

    </div>
  );
}