"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert, Ticket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface Props {
  certification: string;
  certificationName: string;
  customerName: string;
  customerEmail: string;
  suggestedCode: string;
}

export default function AssignVoucherForm({
  certification,
  certificationName,
  customerName,
  customerEmail,
  suggestedCode,
}: Props) {
  const [code, setCode] = useState(suggestedCode);
  const [availableCodes, setAvailableCodes] = useState<string[]>([]);
  const [loadingCodes, setLoadingCodes] = useState(true);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [codeVerifiedUnused, setCodeVerifiedUnused] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/voucher-inventory?certification=${encodeURIComponent(certification)}`)
      .then((res) => res.json())
      .then((data: { codes?: string[] }) => {
        if (!cancelled) setAvailableCodes(data.codes ?? []);
      })
      .catch(() => {
        // Non-fatal — the admin can still type a code in by hand.
      })
      .finally(() => {
        if (!cancelled) setLoadingCodes(false);
      });
    return () => {
      cancelled = true;
    };
  }, [certification]);

  const canSubmit = code.trim() && paymentConfirmed && codeVerifiedUnused && status !== "loading";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/assign-voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certification,
          code: code.trim(),
          customerName,
          customerEmail,
          paymentConfirmed,
          codeVerifiedUnused,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to assign voucher");

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to assign voucher");
    }
  };

  if (status === "success") {
    return (
      <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 pt-44 pb-16">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [-20, 20, -20], y: [-10, 10, -10], scale: [1, 1.08, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-16 top-[10%] h-64 w-64 rounded-full bg-emerald-200/40 dark:bg-emerald-900/20 blur-[120px]"
          />
          <motion.div
            animate={{ x: [20, -20, 20], y: [10, -10, 10], scale: [1, 1.08, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-16 bottom-[10%] h-64 w-64 rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-[120px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full max-w-md rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 text-center shadow-xl shadow-slate-200/40 dark:shadow-black/30"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30"
          >
            <CheckCircle2 className="h-8 w-8 text-white" />
          </motion.div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100">Voucher sent</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Marked used and emailed to the customer. They&apos;ll get redemption instructions with it.
          </p>

          <div className="mt-6 space-y-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-5 text-left">
            <div className="flex items-start justify-between gap-3 text-sm">
              <span className="shrink-0 text-slate-500 dark:text-slate-500">Customer</span>
              <span className="min-w-0 flex-1 break-words text-right font-medium text-slate-800 dark:text-slate-200">
                {customerName || "Not provided"}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3 text-sm">
              <span className="shrink-0 text-slate-500 dark:text-slate-500">Email</span>
              <span className="min-w-0 flex-1 break-all text-right font-medium text-slate-800 dark:text-slate-200">
                {customerEmail || "Not provided"}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3 text-sm">
              <span className="shrink-0 text-slate-500 dark:text-slate-500">Certification</span>
              <span className="min-w-0 flex-1 break-words text-right font-medium text-slate-800 dark:text-slate-200">
                {certificationName || certification}
              </span>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
              <p className="text-center text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                Voucher code
              </p>
              <p className="mt-1 break-all text-center font-mono text-lg font-bold tracking-wide text-slate-900 dark:text-slate-100">
                {code}
              </p>
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">You can close this tab now.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 pt-44 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/40">
          <Ticket className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">Assign voucher</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Only complete this after payment has actually landed.
        </p>

        <div className="mt-6 space-y-1 rounded-2xl bg-slate-50 dark:bg-slate-800/60 px-4 py-3 text-sm">
          <p className="text-slate-700 dark:text-slate-300">
            <span className="text-slate-500 dark:text-slate-500">Customer:</span>{" "}
            {customerName || "Not provided"}
          </p>
          <p className="break-all text-slate-700 dark:text-slate-300">
            <span className="text-slate-500 dark:text-slate-500">Email:</span> {customerEmail || "Not provided"}
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <span className="text-slate-500 dark:text-slate-500">Certification:</span>{" "}
            {certificationName || certification}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            Voucher code
          </label>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter or confirm the voucher code"
            className="mt-2 h-12 w-full rounded-xl border-slate-200 dark:border-slate-800 font-mono focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
          />

          <div className="mt-2 text-xs text-slate-500 dark:text-slate-500">
            {loadingCodes ? (
              "Checking inventory..."
            ) : availableCodes.length > 0 ? (
              <span className="flex flex-wrap items-center gap-1.5">
                Available for {certification}:
                {availableCodes.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCode(c)}
                    className={`rounded-full border px-2.5 py-1 font-mono transition-colors ${
                      c === code
                        ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:border-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300"
                        : "border-slate-200 text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </span>
            ) : (
              "No codes currently in inventory for this certification. Buy one and enter it above."
            )}
          </div>

          <div className="mt-6 space-y-3 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/70 dark:bg-amber-950/20 p-4">
            <div className="flex items-start gap-2">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
              <p className="text-xs font-semibold text-amber-900 dark:text-amber-300">
                Both must be checked before sending
              </p>
            </div>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={paymentConfirmed}
                onChange={(e) => setPaymentConfirmed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              I have confirmed payment was received for this enrollment.
            </label>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={codeVerifiedUnused}
                onChange={(e) => setCodeVerifiedUnused(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              I have verified the voucher code above is correct and hasn&apos;t been sent to anyone else.
            </label>
          </div>

          <Button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Mark Used & Send to Customer"}
          </Button>

          {status === "error" && (
            <p className="mt-4 text-center text-sm font-medium text-red-600">✗ {errorMessage}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
