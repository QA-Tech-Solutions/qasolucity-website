import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="QA Solucity Home"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 text-lg font-bold text-white shadow-lg">
        Q
      </div>

      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          QA Solucity
        </h2>

        <p className="-mt-1 text-xs tracking-[0.25em] text-slate-400 uppercase">
          Quality Assurance
        </p>
      </div>
    </Link>
  );
}