// Icon *keys* rather than component references: this data crosses a
// Server -> Client Component boundary (CertificationPathways is an async
// server component; PathwayCard is a client component), and React Server
// Components can't serialize function values like a Lucide component
// across that boundary. PathwayCard resolves each key to its icon locally.
export type PathwayFeatureIcon =
  | "video"
  | "bookOpenCheck"
  | "sparkles"
  | "fileCheck2"
  | "timer"
  | "ticket"
  | "handshake"
  | "messagesSquare";

export interface PathwayFeature {
  label: string;
  icon: PathwayFeatureIcon;
}

export interface Pathway {
  track: "prep" | "bundle";
  routeLabel: string;
  title: string;
  tagline: string;
  description: string;
  // Static fallback copy — the Bundle's priceLabel/priceNote are
  // overridden at render time in CertificationPathways.tsx with the live
  // computed price from lib/certification-pricing.ts. These values only
  // show if that computation ever throws.
  priceLabel: string;
  priceNote: string;
  originalPriceLabel?: string;
  features: PathwayFeature[];
  ctaLabel: string;
  highlight?: boolean;
  badge?: string;
}

export const pathways: Pathway[] = [
  {
    track: "prep",
    routeLabel: "Route A",
    title: "Self-Starter Prep Track",
    tagline: "Train with us, register for your exam whenever you're ready.",
    description:
      "Best if you already know which board and test window you want, or you'd rather handle exam payment and scheduling yourself, directly with the official registrar.",
    priceLabel: "₦180,000",
    priceNote: "one-time · training only, excludes exam voucher",
    features: [
      { label: "Live, instructor-led ISTQB prep classes", icon: "video" },
      { label: "QA Solucity study guides & slide decks", icon: "bookOpenCheck" },
      { label: "Hands-on exercises based on real test scenarios", icon: "sparkles" },
      { label: "Full-length mock exams with scored feedback", icon: "fileCheck2" },
      { label: "Exam-day readiness session", icon: "timer" },
      { label: "You book & pay for your official exam directly with the registrar", icon: "ticket" },
    ],
    ctaLabel: "Enroll in Prep Course",
  },
  {
    track: "bundle",
    routeLabel: "Route C",
    title: "All-Inclusive Certification Bundle",
    tagline: "Everything in the Prep Track, plus your exam is already paid for.",
    description:
      "Best if you'd rather not deal with international card payments, currency conversion, or registrar sign-up — we fold a prepaid official exam voucher into one Naira invoice.",
    priceLabel: "₦520,000",
    priceNote: "one-time · training + prepaid official exam voucher · live USD→NGN rate",
    features: [
      { label: "Everything in the Self-Starter Prep Track", icon: "sparkles" },
      { label: "Prepaid official exam voucher included", icon: "ticket" },
      { label: "We handle registrar sign-up logistics for you", icon: "handshake" },
      { label: "Priority scheduling support for your exam slot", icon: "timer" },
      { label: "Direct WhatsApp line to your cohort coordinator", icon: "messagesSquare" },
      { label: "Voucher code delivered to your email within 24 hours of payment", icon: "fileCheck2" },
    ],
    ctaLabel: "Get Full Bundle",
    highlight: true,
    badge: "Best Value",
  },
];

export interface CertificationEntry {
  code: string;
  name: string;
}

export interface CertificationGroup {
  title: string;
  description: string;
  items: CertificationEntry[];
}

export const certificationCatalog: CertificationGroup[] = [
  {
    title: "Core Certifications",
    description:
      "The foundational and advanced-level path most testers start with, from first principles through specialist advanced roles.",
    items: [
      { code: "CTFL", name: "Certified Tester Foundation Level" },
      { code: "CT-TA", name: "Certified Tester Advanced Level — Test Analyst" },
      { code: "CT-TTA", name: "Certified Tester Advanced Level — Technical Test Analyst" },
      { code: "CT-TM", name: "Certified Tester Advanced Level — Test Manager" },
    ],
  },
  {
    title: "Specialist Certifications",
    description:
      "Focused, in-demand tracks for testers who want to go deep on a specific discipline once they've built a solid foundation.",
    items: [
      { code: "CT-TAE", name: "Certified Tester — Test Automation Engineer" },
      { code: "CT-AI", name: "Certified Tester — AI Testing" },
      { code: "CT-DEVOPS", name: "Certified Tester — DevOps Testing" },
      { code: "CT-PT", name: "Certified Tester — Performance Testing" },
      { code: "CT-MAT", name: "Certified Tester — Mobile Application Testing" },
      { code: "CT-SEC", name: "Certified Tester — Security Tester" },
    ],
  },
  {
    title: "Agile Certifications",
    description:
      "For testers embedded in agile teams who need to formalize how they work inside sprints, ceremonies, and cross-functional squads.",
    items: [
      { code: "CTFL-AT", name: "Certified Tester Foundation Level — Agile Tester" },
      { code: "CTAL-ATT", name: "Certified Tester Advanced Level — Agile Technical Tester" },
    ],
  },
];

// Flattened for the enrollment form's "which certification" dropdown.
export const allCertifications: CertificationEntry[] = certificationCatalog.flatMap(
  (group) => group.items
);
