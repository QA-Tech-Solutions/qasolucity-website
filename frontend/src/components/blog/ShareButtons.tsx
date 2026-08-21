"use client";

import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaFacebookF } from "react-icons/fa6";

interface Props {
  title: string;
  path: string;
}

export default function ShareButtons({ title, path }: Props) {
  const [url, setUrl] = useState(path);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(`${window.location.origin}${path}`);
  }, [path]);

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
    "group flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-600 hover:text-white";

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-500">Share:</span>

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
