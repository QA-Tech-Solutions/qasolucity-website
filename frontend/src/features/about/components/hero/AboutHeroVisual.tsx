export default function AboutHeroVisual() {
  return (
    <div className="relative">

      <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-2xl">

        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Our Purpose
        </span>

        <h3 className="mt-6 text-3xl font-bold text-slate-900">
          Quality is more than testing.
        </h3>

        <p className="mt-6 leading-8 text-slate-600">
          We believe software quality should be embedded throughout
          the development lifecycle—not inspected at the end.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6">

          <div className="rounded-2xl bg-slate-50 p-6">
            <h4 className="text-4xl font-bold text-indigo-600">
              100%
            </h4>

            <p className="mt-2 text-sm text-slate-600">
              Quality Focus
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <h4 className="text-4xl font-bold text-indigo-600">
              24h
            </h4>

            <p className="mt-2 text-sm text-slate-600">
              Average Response
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}