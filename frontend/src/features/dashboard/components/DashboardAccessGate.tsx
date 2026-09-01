"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/**
 * Same login flow as AdminAccessGate (POST /api/admin/login, then
 * router.refresh() to re-run the server component with the new session
 * cookie), but sized to sit inside DashboardShell's content area rather
 * than take over the whole page - AdminAccessGate's own min-h-[80vh]/
 * pt-44 assume it's the page's only content directly under the navbar,
 * which double-pads badly once nested under the shell's sidebar layout.
 */
export default function DashboardAccessGate({ description }: { description?: string }) {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Incorrect access code");
      }

      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center rounded-3xl border border-slate-200 bg-slate-50 px-6 py-14 text-center dark:border-white/10 dark:bg-white/[0.02]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-500/15">
        <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h1 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">Admin access required</h1>
      <p className="mt-2 text-sm text-slate-500">
        {description ?? "Enter the admin access code to continue."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 w-full">
        <Input
          type="password"
          value={accessCode}
          onChange={(e) => {
            setAccessCode(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Access code"
          autoFocus
          className="h-12 w-full rounded-xl border-slate-200 bg-white text-center text-slate-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        {status === "error" && (
          <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">✗ {errorMessage}</p>
        )}
        <Button
          type="submit"
          disabled={status === "loading" || !accessCode.trim()}
          className="mt-4 h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Checking..." : "Continue"}
        </Button>
      </form>
    </div>
  );
}
