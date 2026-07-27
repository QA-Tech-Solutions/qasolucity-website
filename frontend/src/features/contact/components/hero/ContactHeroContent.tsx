import ContactHeroActions from "./ContactHeroActions";

export default function ContactHeroContent() {
  return (
    <div>

      <span className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
        Contact Us
      </span>

      <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 lg:text-7xl">

        Let's build reliable software together.

      </h1>

      <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-600">

        Whether you're looking for software testing,
        automation, QA consulting or corporate training,
        we'd love to learn about your project and discuss
        how we can help.

      </p>

      <ContactHeroActions />

    </div>
  );
}