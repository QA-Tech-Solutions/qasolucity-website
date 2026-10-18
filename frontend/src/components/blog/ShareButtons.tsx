"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { SITE_URL } from "@/lib/site-config";

interface Props {
  title: string;
  path: string;
}

export default function ShareButtons({ title, path }: Props) {
  // The canonical origin, not window.location.origin - this is a client
  // component, so the server-rendered HTML (before hydration) would
  // otherwise ship relative hrefs straight into these share-intent URLs.
  // A relative path means nothing as a query param on a third-party
  // domain, so every one of these links would be broken for as long as
  // hydration takes, not just the single tick a useEffect would cost.
  const url = `${SITE_URL}${path}`;
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "Share on LinkedIn",
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Share on X",
      icon: FaXTwitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Share on Facebook",
      icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; nothing to fall back to gracefully here.
    }
  };

  const buttonClassName =
    "group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-600 hover:text-white";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Share:</span>

      {shareLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={buttonClassName}
        >
          <social.icon className="h-4 w-4" />
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link to this article"
        className={buttonClassName}
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-500 group-hover:text-white" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>

      {copied && (
        <span className="text-sm font-medium text-emerald-600">Link copied!</span>
      )}
    </div>
  );
}
