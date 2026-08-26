"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminAccessGate() {
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

      // Re-runs the server component with the now-valid session cookie,
      // preserving the current URL and query params (certification,
      // customer details, suggested code) instead of losing them to a
      // redirect.
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-sm flex-col items-center justify-center px-4 pt-44 pb-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
        <Lock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Admin access required</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Enter the admin access code to continue.
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
          className="h-12 w-full rounded-xl border-slate-200 dark:border-slate-800 text-center focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
        />
        {status === "error" && (
          <p className="mt-2 text-sm font-medium text-red-600">✗ {errorMessage}</p>
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
