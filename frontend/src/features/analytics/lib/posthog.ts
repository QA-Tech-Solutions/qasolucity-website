import posthog from "posthog-js";

/**
 * PostHog only ever loads after explicit consent (see CookieConsentBanner) —
 * nothing here runs, and no PostHog cookies/local storage get written,
 * until setConsent("accepted") is called. Consent itself is remembered in
 * this site's own localStorage key, independent of PostHog.
 */

const CONSENT_KEY = "qas_analytics_consent";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

export type ConsentStatus = "accepted" | "declined";

export function getConsent(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

let initialized = false;

/** Idempotent — safe to call more than once (e.g. on every mount). */
export function initPostHog(): void {
  if (initialized || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    // No session recordings — analytics/events only, per how this was scoped.
    disable_session_recording: true,
  });
  initialized = true;
}

export function setConsent(status: ConsentStatus): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONSENT_KEY, status);
  } catch {
    // Ignore — worst case the banner reappears next visit.
  }
  if (status === "accepted") {
    initPostHog();
  }
}

/** Lets the Cookie Policy page's "change your mind" control re-show the banner. */
export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Ignore
  }
}

/** No-ops silently if analytics hasn't been consented to / initialized. */
export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  if (!initialized) return;
  posthog.capture(name, properties);
}

export function trackPageview(): void {
  if (!initialized) return;
  posthog.capture("$pageview");
}

// Central place for event names so call sites can't drift/typo them.
export const ANALYTICS_EVENTS = {
  CONTACT_FORM_SUBMITTED: "contact_form_submitted",
  NEWSLETTER_SUBSCRIBED: "newsletter_subscribed",
  CERTIFICATION_ENROLLED: "certification_enrolled",
  CAREER_APPLICATION_SUBMITTED: "career_application_submitted",
} as const;
