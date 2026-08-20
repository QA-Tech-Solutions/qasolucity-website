"use client";

import { Clock3, Mail, MapPin, MessageCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@qasolucity.com",
    href: "mailto:hello@qasolucity.com",
    action: "Send us a message",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+234 708 070 2920",
    href: "https://wa.me/2347080702920?text=Hello%20QA%20Solucity%2C%20I%27d%20like%20to%20discuss%20a%20project.",
    action: "Chat with us instantly",
  },
  // {
  //   icon: MapPin,
  //   title: "Location",
  //   value: "Lagos, Nigeria",
  //   href: null,
  //   action: "Find us on Google Maps",
  // },
  {
    icon: Clock3,
    title: "Business Hours",
    value: "Mon – Fri, 9AM – 6PM",
    href: null,
    action: "We're open now",
  },
];

export default function ContactHeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-2xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30"
    >
      {/* Decorative glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100/20 blur-3xl pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Get in Touch</h3>
            <p className="mt-1 text-sm text-slate-500">
              We respond within 24 hours
            </p>
          </div>
          <Link
            href="https://calendar.google.com"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors duration-300 hover:bg-indigo-100"
          >
            <Calendar className="h-4 w-4" />
            Schedule Call
          </Link>
        </div>

        {/* Contact Items */}
        <div className="mt-6 space-y-4">
          {contactItems.map(({ icon: Icon, title, value, href, action }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
              className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-indigo-50/50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 transition-colors duration-300 group-hover:bg-indigo-100">
                <Icon className="h-5 w-5 text-indigo-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                    {title}
                  </p>
                  {href && (
                    <span className="text-xs text-indigo-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Click to contact
                    </span>
                  )}
                </div>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-0.5 block font-semibold text-slate-900 transition-colors duration-300 hover:text-indigo-600"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-0.5 font-semibold text-slate-900">{value}</p>
                )}
                <p className="mt-0.5 text-xs text-slate-400">{action}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicator */}
        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-indigo-50/50 px-4 py-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm text-slate-600">
            Typically replies within 24 hours
          </span>
        </div>
      </div>
    </motion.div>
  );
}