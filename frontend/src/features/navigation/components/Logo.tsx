import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="QA Solucity Home"
      className="flex items-center gap-4 transition-opacity hover:opacity-90"
    >
      <Image
        src="/images/logos/qa-solucity-logo.png"
        alt="QA Solucity"
        width={52}
        height={52}
        priority
        className="h-12 w-auto object-contain rounded-xl"
      />

      <div className="leading-none">
        <h2 className="text-[22px] font-bold tracking-tight text-slate-900">
          QA Solucity
        </h2>

        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.32em] text-indigo-600">
          Quality Assurance
        </p>
      </div>
    </Link>
  );
}