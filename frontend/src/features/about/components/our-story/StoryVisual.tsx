import StoryTimeline from "./StoryTimeline";

export default function StoryVisual() {
  return (
    <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-xl">

      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
        Our Journey
      </span>

      <h3 className="mt-5 text-3xl font-bold text-slate-900">
        How we approach quality.
      </h3>

      <div className="mt-12">

        <StoryTimeline />

      </div>

    </div>
  );
}