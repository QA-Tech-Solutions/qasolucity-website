"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getConsent, initPostHog, trackPageview } from "../lib/posthog";

/**
 * Renders nothing — just (a) resumes PostHog on mount if a past visit
 * already consented, and (b) captures a $pageview on every client-side
 * route change. The very first page load doesn't need a manual capture
 * here: initPostHog's capture_pageview:true fires one automatically,
 * whether that happens on this mount (returning visitor) or later when
 * the consent banner is accepted (capture_pageview fires at that init
 * call too, recording whatever page they were already on).
 */
export default function PostHogPageviewTracker() {
  const pathname = usePathname();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (getConsent() === "accepted") {
      initPostHog();
    }
  }, []);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    trackPageview();
  }, [pathname]);

  return null;
}
