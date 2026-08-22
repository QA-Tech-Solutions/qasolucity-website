"use client";

// global-error replaces the root layout entirely when it throws, so it
// must define its own <html>/<body> and import global styles itself.
import "./globals.css";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900 px-6">
        <div className="mx-auto max-w-md text-center">
          <p className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-7xl font-black text-transparent">
            500
          </p>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Something went wrong on our end.
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            We hit an unexpected error while loading the site. Our team has
            been notified, please try again shortly.
          </p>

          {error.digest && (
            <p className="mt-4 font-mono text-xs text-slate-400 dark:text-slate-500">
              Error reference: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={unstable_retry}
              className="h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
            >
              Try Again
            </button>
            <a
              href="/"
              className="flex h-12 items-center rounded-2xl border border-slate-300 dark:border-slate-700 px-6 text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
