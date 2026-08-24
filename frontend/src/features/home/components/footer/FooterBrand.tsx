import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMedium,
  FaThreads,
  FaXTwitter,
} from "react-icons/fa6";

const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/qasolucity/",
    icon: FaLinkedinIn,
  },
  {
    name: "Medium",
    href: "https://medium.com/@qasolucity",
    icon: FaMedium,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/qasolucity",
    icon: FaInstagram,
  },
//   {
//     name: "Threads",
//     href: "#",
//     icon: FaThreads,
//   },
  {
    name: "X",
    href: "#",
    icon: FaXTwitter,
  },
  {
    name: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  // {
  //   name: "Email",
  //   href: "mailto:hello@qasolucity.com",
  //   icon: Mail,
  // },
];

export default function FooterBrand() {
  return (
    <div>
      {/* Logo */}

      <Link
        href="/"
        className="inline-flex items-center gap-4"
      >
        <Image
          src="/images/logos/qa-solucity-logo.png"
          alt="QA Solucity"
          width={58}
          height={58}
          className="h-14 w-auto object-contain rounded-xl"
        />

        <h3 className="text-2xl font-bold tracking-tight text-white">
          QA Solucity
        </h3>
      </Link>

      {/* Description */}

      <p className="mt-8 max-w-md text-[16px] leading-8 text-slate-400">
        Helping startups, enterprises and digital businesses build
        reliable software through expert quality assurance, automation
        testing and QA consulting.
      </p>

      {/* Contact */}

      <a
        href="mailto:hello@qasolucity.com"
        className="mt-6 inline-flex items-center gap-3 text-slate-300 transition hover:text-white"
      >
        <Mail className="h-5 w-5 text-indigo-400" />

        hello@qasolucity.com
      </a>

      {/* Socials */}

      <div className="mt-10 flex flex-wrap gap-3">
        {socials.map((social) => {
          const Icon = social.icon;

          return (
            <Link
              key={social.name}
              href={social.href}
              aria-label={social.name}
              target={
                social.href.startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="
                group
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.03]
                text-slate-400
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-indigo-500/40
                hover:bg-indigo-600
                hover:text-white
              "
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}