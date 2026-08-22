import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="QA Solucity Home"
      className="group flex items-center gap-3 transition-opacity hover:opacity-80"
    >
      <Image
        src="/images/logos/qa-solucity-logo.png"
        alt="QA Solucity logo"
        width={52}
        height={52}
        priority
        className="h-12 w-auto object-contain rounded-xl"
      />

      <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        QA Solucity
      </span>
    </Link>
  );
}