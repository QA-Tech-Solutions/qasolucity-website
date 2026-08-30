"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { trackEvent, ANALYTICS_EVENTS } from "@/features/analytics/lib/posthog";

export default function FooterNewsletter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to subscribe");

      setStatus("success");
      trackEvent(ANALYTICS_EVENTS.NEWSLETTER_SUBSCRIBED);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to subscribe");
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold">Stay Updated</h3>

      <p className="mt-4 leading-7 text-slate-400">
        Get QA insights, testing tips and company updates.
      </p>

      {status === "success" ? (
        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          <p className="text-sm leading-6 text-slate-300">
            You&apos;re on the list. Check your inbox for a confirmation.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            required
            className="h-14 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
          />

          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
            className="h-14 border-white/10 bg-white/5 text-white placeholder:text-slate-500"
          />

          <Button
            type="submit"
            disabled={status === "loading"}
            className="h-14 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
            {status !== "loading" && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>

          {status === "error" && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}
        </form>
      )}
    </div>
  );
}
