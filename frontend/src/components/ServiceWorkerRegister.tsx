"use client";

import { useEffect } from "react";

// Registers the offline-fallback service worker (public/sw.js + public/offline.html).
// Production only — a cached worker fighting the dev server's fast refresh
// would cause more confusion than the offline page is worth while developing.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);

  return null;
}
