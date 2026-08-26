import { services } from "@/features/services/data/services";

interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
}

// Sourced from the real /services catalog (same list the contact form's
// dropdown uses) so this can't silently drift out of sync with it.
const SERVICE_LABELS: Record<string, string> = {
  ...Object.fromEntries(services.map((service) => [service.slug, service.title])),
  other: "Other / Not sure",
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });

// "indigo" and "emerald" map to the .email-badge-* dark-mode overrides
// defined in DARK_STYLE_BLOCK below — inline styles below are the light
// (and no-dark-mode-support fallback) colors.
const badge = (variant: "indigo" | "emerald", dotColor: string, bg: string, text: string, label: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
    <tr>
      <td class="email-badge-${variant}" style="background-color:${bg};border-radius:999px;padding:6px 14px;">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:8px;">
              <div style="width:7px;height:7px;border-radius:50%;background-color:${dotColor};"></div>
            </td>
            <td class="email-badge-${variant}-text" style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${text};">${label}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

const button = (href: string, label: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 4px;">
    <tr>
      <td style="border-radius:14px;background:linear-gradient(90deg,#4F46E5,#7C3AED);">
        <a href="${href}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:14px;">
          ${label} &rarr;
        </a>
      </td>
    </tr>
  </table>
`;

// Inline styles are the light-mode look and the fallback for clients with
// no dark-mode support at all (e.g. Outlook desktop). Clients that *do*
// support it (Apple Mail, iOS/Android Mail, Outlook mobile, Thunderbird,
// and Gmail's own dark rendering to varying degrees) pick up the
// `!important` overrides below via the matching class names instead —
// inline styles win over plain CSS, so overriding them needs both a class
// hook here and the meta tags declaring the page supports both schemes.
const DARK_STYLE_BLOCK = `
  @media (prefers-color-scheme: dark) {
    .email-bg { background-color: #0b1120 !important; }
    .email-card { background-color: #0f172a !important; box-shadow: none !important; }
    .email-heading { color: #f1f5f9 !important; }
    .email-muted { color: #94a3b8 !important; }
    .email-quote-bg { background-color: #1e293b !important; }
    .email-quote-text { color: #e2e8f0 !important; }
    .email-value { color: #e2e8f0 !important; }
    .email-divider { border-color: #1e293b !important; }
    .email-link { color: #a5b4fc !important; }
    .email-footer-bg { background-color: #0b1120 !important; border-top-color: #1e293b !important; }
    .email-badge-indigo { background-color: rgba(99,102,241,0.16) !important; }
    .email-badge-indigo-text { color: #a5b4fc !important; }
    .email-badge-emerald { background-color: rgba(16,185,129,0.16) !important; }
    .email-badge-emerald-text { color: #6ee7b7 !important; }
  }
`;

const wrapper = (bodyHtml: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <style>${DARK_STYLE_BLOCK}</style>
  </head>
  <body class="email-bg" style="margin:0;padding:0;background-color:#f4f2ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-bg" style="background-color:#f4f2ee;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="email-card" style="max-width:560px;background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 12px 40px -12px rgba(79,70,229,0.18);">
            <tr>
              <td style="background:linear-gradient(135deg,#4F46E5,#7C3AED);padding:32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="width:36px;height:36px;background-color:rgba(255,255,255,0.16);border-radius:10px;text-align:center;vertical-align:middle;">
                      <span style="font-size:18px;font-weight:800;color:#ffffff;line-height:36px;">Q</span>
                    </td>
                    <td style="padding-left:12px;">
                      <span style="color:#ffffff;font-size:17px;font-weight:700;">QA Solucity</span><br/>
                      <span style="color:rgba(255,255,255,0.75);font-size:11px;letter-spacing:0.06em;text-transform:uppercase;">Where Quality Meets Innovation</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td class="email-footer-bg" style="padding:22px 32px;background-color:#f8fafc;border-top:1px solid #eef1f6;">
                <p class="email-muted" style="margin:0;font-size:12px;color:#94a3b8;">
                  QA Solucity &middot; Lagos, Nigeria &middot;
                  <a href="mailto:hello@qasolucity.com" class="email-muted" style="color:#94a3b8;">hello@qasolucity.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const detailRow = (label: string, value?: string) =>
  value
    ? `<tr>
        <td class="email-divider" style="padding:10px 0;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#94a3b8;width:110px;vertical-align:top;border-bottom:1px solid #f1f5f9;">${label}</td>
        <td class="email-value email-divider" style="padding:10px 0;font-size:14px;color:#0f172a;border-bottom:1px solid #f1f5f9;">${value}</td>
      </tr>`
    : "";

export function internalNotificationEmail(payload: ContactDetails) {
  const { firstName, lastName, email, company, phone, service, message } = payload;
  const serviceLabel = service ? SERVICE_LABELS[service] ?? service : undefined;

  const html = wrapper(`
    ${badge("indigo", "#4F46E5", "#eef2ff", "#4338ca", "New enquiry")}
    <h1 class="email-heading" style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#0f172a;">You've got a new lead! 🔔</h1>
    <p class="email-muted" style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#64748b;">
      ${escapeHtml(firstName)} ${escapeHtml(lastName)} just submitted the contact form. Reply while it's fresh.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
      ${detailRow("Name", escapeHtml(`${firstName} ${lastName}`))}
      ${detailRow("Email", `<a href="mailto:${escapeHtml(email)}" class="email-link" style="color:#4F46E5;text-decoration:none;">${escapeHtml(email)}</a>`)}
      ${detailRow("Company", company ? escapeHtml(company) : undefined)}
      ${detailRow("Phone", phone ? escapeHtml(phone) : undefined)}
      ${detailRow("Service", serviceLabel ? escapeHtml(serviceLabel) : undefined)}
    </table>
    <p class="email-muted" style="margin:20px 0 8px;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#94a3b8;">Message</p>
    <p class="email-quote-bg email-quote-text" style="margin:0;font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-wrap;background-color:#f8fafc;border-radius:14px;padding:18px;">${escapeHtml(message)}</p>
    ${button(`mailto:${email}`, `Reply to ${escapeHtml(firstName)}`)}
  `);

  const text = [
    `New enquiry from ${firstName} ${lastName}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    phone ? `Phone: ${phone}` : null,
    serviceLabel ? `Service: ${serviceLabel}` : null,
    "",
    "Message:",
    message,
    "",
    `Reply directly to ${email} to follow up.`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `🔔 New enquiry from ${firstName} ${lastName}`,
    html,
    text,
  };
}

export function confirmationEmail(payload: ContactDetails) {
  const { firstName, service, message } = payload;
  const serviceLabel = service ? SERVICE_LABELS[service] ?? service : undefined;

  const steps = [
    ["1", "We review your message", "Our team reads through your project details, usually within a couple of hours."],
    ["2", "A QA specialist reaches out", `You'll hear from us by email or phone within 24 hours${serviceLabel ? ` about ${escapeHtml(serviceLabel)}` : ""}.`],
    ["3", "We map out next steps", "If it's a fit, we'll schedule a free consultation to scope the work."],
  ];

  const stepsHtml = steps
    .map(
      ([number, title, desc]) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
      <tr>
        <td style="width:30px;vertical-align:top;">
          <div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#ffffff;font-size:12px;font-weight:700;text-align:center;line-height:24px;">${number}</div>
        </td>
        <td style="padding-left:12px;vertical-align:top;">
          <p class="email-heading" style="margin:0;font-size:14px;font-weight:600;color:#0f172a;">${title}</p>
          <p class="email-muted" style="margin:2px 0 0;font-size:13px;line-height:1.5;color:#64748b;">${desc}</p>
        </td>
      </tr>
    </table>`
    )
    .join("");

  const html = wrapper(`
    ${badge("emerald", "#10b981", "#ecfdf5", "#047857", "Message received")}
    <h1 class="email-heading" style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#0f172a;">Thanks for reaching out, ${escapeHtml(firstName)}! 🎉</h1>
    <p class="email-muted" style="margin:0 0 28px;font-size:14px;line-height:1.6;color:#64748b;">
      We've got your message and a QA specialist will be in touch within 24 hours. Here's what happens next:
    </p>
    ${stepsHtml}
    <p class="email-muted" style="margin:24px 0 8px;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#94a3b8;">Your message</p>
    <p class="email-quote-bg email-quote-text" style="margin:0;font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-wrap;background-color:#f8fafc;border-radius:14px;padding:18px;">${escapeHtml(message)}</p>
    ${button("https://qasolucity.com/services", "Explore our services")}
    <p class="email-muted" style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#94a3b8;">
      Something urgent? Reach us directly at
      <a href="mailto:hello@qasolucity.com" class="email-link" style="color:#4F46E5;">hello@qasolucity.com</a>.
    </p>
  `);

  const text = [
    `Thanks for reaching out, ${firstName}!`,
    "",
    "We've got your message and a QA specialist will be in touch within 24 hours.",
    "",
    "What happens next:",
    "1. We review your message",
    `2. A QA specialist reaches out${serviceLabel ? ` about ${serviceLabel}` : ""}`,
    "3. We map out next steps and schedule a free consultation",
    "",
    "Your message:",
    message,
    "",
    "Something urgent? Reach us directly at hello@qasolucity.com.",
  ].join("\n");

  return {
    subject: "We've received your message: QA Solucity",
    html,
    text,
  };
}

// ---------------------------------------------------------------------------
// ISTQB Certification Pathways enrollment
// ---------------------------------------------------------------------------

export interface CertificationEnrollmentDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  track: "prep" | "bundle";
  certificationCode: string;
  certificationName: string;
  notes?: string;
  priceNgn: number;
  /** Bundle only — a read-only suggestion (not reserved) to prefill the admin's assign-voucher screen. */
  suggestedVoucherCode?: string | null;
}

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const TRACK_LABELS: Record<CertificationEnrollmentDetails["track"], string> = {
  prep: "Self-Starter Prep Track",
  bundle: "All-Inclusive Certification Bundle",
};

const rawSiteUrl = (process.env.SITE_URL || "https://qasolucity.com").replace(/\/$/, "");
const SITE_URL = /^https?:\/\//.test(rawSiteUrl) ? rawSiteUrl : `https://${rawSiteUrl}`;

export function certificationInternalNotificationEmail(payload: CertificationEnrollmentDetails) {
  const {
    firstName,
    lastName,
    email,
    phone,
    track,
    certificationCode,
    certificationName,
    notes,
    priceNgn,
    suggestedVoucherCode,
  } = payload;
  const trackLabel = TRACK_LABELS[track];
  const priceLabel = nairaFormatter.format(priceNgn);

  const assignVoucherUrl = `${SITE_URL}/admin/assign-voucher?${new URLSearchParams({
    certification: certificationCode,
    customerName: `${firstName} ${lastName}`,
    customerEmail: email,
    ...(suggestedVoucherCode ? { code: suggestedVoucherCode } : {}),
  }).toString()}`;

  const html = wrapper(`
    ${badge("indigo", "#4F46E5", "#eef2ff", "#4338ca", "New enrollment")}
    <h1 class="email-heading" style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#0f172a;">New certification enrollment 🎓</h1>
    <p class="email-muted" style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#64748b;">
      ${escapeHtml(firstName)} ${escapeHtml(lastName)} just enrolled in the ${escapeHtml(trackLabel)}.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
      ${detailRow("Name", escapeHtml(`${firstName} ${lastName}`))}
      ${detailRow("Email", `<a href="mailto:${escapeHtml(email)}" class="email-link" style="color:#4F46E5;text-decoration:none;">${escapeHtml(email)}</a>`)}
      ${detailRow("Phone", phone ? escapeHtml(phone) : undefined)}
      ${detailRow("Track", escapeHtml(trackLabel))}
      ${detailRow("Certification", escapeHtml(certificationName))}
      ${detailRow("Price", escapeHtml(priceLabel))}
    </table>
    ${
      track === "bundle"
        ? `<p class="email-quote-bg email-quote-text" style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#0f172a;background-color:#fffbeb;border-radius:14px;padding:14px 18px;">
      ⚠️ Bundle enrollment: no voucher has been assigned yet. Once payment is confirmed, use the button
      below to assign and send one.
    </p>
    ${button(assignVoucherUrl, "Assign & Send Voucher")}`
        : ""
    }
    ${
      notes
        ? `<p class="email-muted" style="margin:20px 0 8px;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#94a3b8;">Notes</p>
    <p class="email-quote-bg email-quote-text" style="margin:0;font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-wrap;background-color:#f8fafc;border-radius:14px;padding:18px;">${escapeHtml(notes)}</p>`
        : ""
    }
    ${button(`mailto:${email}`, `Reply to ${escapeHtml(firstName)}`)}
  `);

  const text = [
    `New ${trackLabel} enrollment from ${firstName} ${lastName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Certification: ${certificationName}`,
    `Price: ${priceLabel}`,
    track === "bundle"
      ? `No voucher assigned yet. Once payment is confirmed, assign and send one at: ${assignVoucherUrl}`
      : null,
    notes ? `\nNotes:\n${notes}` : null,
    "",
    `Reply directly to ${email} to follow up.`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `🎓 New ${trackLabel} enrollment: ${firstName} ${lastName}`,
    html,
    text,
  };
}

export function certificationConfirmationEmail(payload: CertificationEnrollmentDetails) {
  const { firstName, track, certificationName, priceNgn } = payload;
  const priceLabel = nairaFormatter.format(priceNgn);

  const prepSteps = [
    [
      "1",
      "We reach out about payment",
      "Our team will contact you by email or phone within 24 hours to confirm payment and your class schedule. Nothing has been charged yet.",
    ],
    [
      "2",
      "Register with the official exam board",
      "When you're ready to sit your exam, create an account directly with the independent registrar (AT*SQA for most NGSTQB candidates, iSQI for select tracks). QA Solucity has no role in this step.",
    ],
    [
      "3",
      "Buy your exam voucher & schedule a date",
      "Purchase your voucher directly from the registrar and pick a test window, online or at a test center. Most vouchers stay valid for booking within 365 days of purchase.",
    ],
  ];

  const bundleSteps = [
    [
      "1",
      "We reach out about payment",
      "Our team will contact you by email or phone within 24 hours to confirm payment and your class schedule. Nothing has been charged yet.",
    ],
    [
      "2",
      "Your voucher follows payment",
      "Once payment is confirmed, we email your prepaid official exam voucher code, along with instructions for redeeming it on the registrar's site.",
    ],
    [
      "3",
      "Redeem it with the registrar",
      "Use the code on the official registrar's site (AT*SQA or iSQI) to schedule your exam date, online or at a test center.",
    ],
  ];

  const steps = track === "bundle" ? bundleSteps : prepSteps;

  const stepsHtml = steps
    .map(
      ([number, title, desc]) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
      <tr>
        <td style="width:30px;vertical-align:top;">
          <div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#ffffff;font-size:12px;font-weight:700;text-align:center;line-height:24px;">${number}</div>
        </td>
        <td style="padding-left:12px;vertical-align:top;">
          <p class="email-heading" style="margin:0;font-size:14px;font-weight:600;color:#0f172a;">${title}</p>
          <p class="email-muted" style="margin:2px 0 0;font-size:13px;line-height:1.5;color:#64748b;">${desc}</p>
        </td>
      </tr>
    </table>`
    )
    .join("");

  const html = wrapper(`
    ${badge("emerald", "#10b981", "#ecfdf5", "#047857", "Enrollment received")}
    <h1 class="email-heading" style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#0f172a;">You're enrolled, ${escapeHtml(firstName)}! 🎉</h1>
    <p class="email-muted" style="margin:0 0 28px;font-size:14px;line-height:1.6;color:#64748b;">
      Thanks for enrolling in ${escapeHtml(certificationName)} prep with QA Solucity (${priceLabel}). Here's what happens next:
    </p>
    ${stepsHtml}
    ${button("https://qasolucity.com/certification", "View your certification pathway")}
    <p class="email-muted" style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#94a3b8;">
      QA Solucity is an independent training provider and is not an official partner, accredited center, or
      authorized testing provider of ISTQB or NGSTQB. Your official exam is written, administered, and
      proctored entirely by an independent exam board. Questions? Reach us at
      <a href="mailto:hello@qasolucity.com" class="email-link" style="color:#4F46E5;">hello@qasolucity.com</a>.
    </p>
  `);

  const text = [
    `You're enrolled, ${firstName}!`,
    "",
    `Thanks for enrolling in ${certificationName} prep with QA Solucity (${priceLabel}). Here's what happens next:`,
    "",
    ...steps.map(([number, title, desc]) => `${number}. ${title}: ${desc.replace(/<[^>]+>/g, "")}`),
    "",
    "QA Solucity is an independent training provider and is not an official partner, accredited center, or",
    "authorized testing provider of ISTQB or NGSTQB. Your official exam is written, administered, and proctored",
    "entirely by an independent exam board.",
    "",
    "Questions? Reach us at hello@qasolucity.com.",
  ].join("\n");

  return {
    subject: `You're enrolled: ${certificationName} prep with QA Solucity`,
    html,
    text,
  };
}

// ---------------------------------------------------------------------------
// Voucher delivery — sent by an admin, by hand, only after they've
// confirmed payment and completed the checklist on /admin/assign-voucher.
// Never sent automatically. See lib/certification-voucher-store.ts.
// ---------------------------------------------------------------------------

export interface VoucherDeliveryDetails {
  firstName: string;
  certificationName: string;
  voucherCode: string;
}

export function voucherDeliveryEmail(payload: VoucherDeliveryDetails) {
  const { firstName, certificationName, voucherCode } = payload;

  const html = wrapper(`
    ${badge("emerald", "#10b981", "#ecfdf5", "#047857", "Payment confirmed")}
    <h1 class="email-heading" style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#0f172a;">Your exam voucher is here, ${escapeHtml(firstName)}! 🎉</h1>
    <p class="email-muted" style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#64748b;">
      Thanks for your payment. Here's your prepaid official exam voucher for ${escapeHtml(certificationName)}.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td class="email-quote-bg" style="background-color:#f8fafc;border-radius:14px;padding:20px;text-align:center;">
          <p class="email-muted" style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Your voucher code</p>
          <p class="email-heading" style="margin:0;font-size:22px;font-weight:800;letter-spacing:0.04em;color:#0f172a;">${escapeHtml(voucherCode)}</p>
        </td>
      </tr>
    </table>
    <p class="email-muted" style="margin:0 0 4px;font-size:14px;line-height:1.6;color:#64748b;">
      Keep this safe. You'll enter it directly on the official registrar's site (AT*SQA or iSQI) when you
      schedule your exam, online or at a test center.
    </p>
    <p class="email-muted" style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#94a3b8;">
      Questions? Reach us at
      <a href="mailto:hello@qasolucity.com" class="email-link" style="color:#4F46E5;">hello@qasolucity.com</a>.
    </p>
  `);

  const text = [
    `Your exam voucher is here, ${firstName}!`,
    "",
    `Thanks for your payment. Here's your prepaid official exam voucher for ${certificationName}.`,
    "",
    `Voucher code: ${voucherCode}`,
    "",
    "Keep this safe. You'll enter it directly on the official registrar's site (AT*SQA or iSQI) when you",
    "schedule your exam, online or at a test center.",
    "",
    "Questions? Reach us at hello@qasolucity.com.",
  ].join("\n");

  return {
    subject: `Your ${certificationName} exam voucher code`,
    html,
    text,
  };
}

// ---------------------------------------------------------------------------
// Sent to the admin themselves right after voucherDeliveryEmail goes out,
// so there's a written confirmation (and a link to the running log) beyond
// just the in-browser success screen.
// ---------------------------------------------------------------------------

export interface VoucherAssignmentConfirmedDetails {
  certificationName: string;
  voucherCode: string;
  customerName: string;
  customerEmail: string;
}

export function voucherAssignmentConfirmedEmail(payload: VoucherAssignmentConfirmedDetails) {
  const { certificationName, voucherCode, customerName, customerEmail } = payload;
  const voucherLogUrl = `${SITE_URL}/admin/voucher-log`;

  const html = wrapper(`
    ${badge("emerald", "#10b981", "#ecfdf5", "#047857", "Voucher sent")}
    <h1 class="email-heading" style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#0f172a;">Sent to ${escapeHtml(customerName)}</h1>
    <p class="email-muted" style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#64748b;">
      This confirms the voucher below was marked used and emailed out.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${detailRow("Customer", escapeHtml(customerName))}
      ${detailRow("Email", escapeHtml(customerEmail))}
      ${detailRow("Certification", escapeHtml(certificationName))}
      ${detailRow("Voucher code", escapeHtml(voucherCode))}
    </table>
    ${button(voucherLogUrl, "View & Download Log")}
  `);

  const text = [
    `Sent to ${customerName}`,
    "",
    `Customer: ${customerName}`,
    `Email: ${customerEmail}`,
    `Certification: ${certificationName}`,
    `Voucher code: ${voucherCode}`,
    "",
    `View & download the full log: ${voucherLogUrl}`,
  ].join("\n");

  return {
    subject: `Voucher sent: ${voucherCode} to ${customerName}`,
    html,
    text,
  };
}

// ---------------------------------------------------------------------------
// QA Career Launchpad enrollment
// ---------------------------------------------------------------------------

export interface LaunchpadEnrollmentDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  notes?: string;
}

export function launchpadInternalNotificationEmail(payload: LaunchpadEnrollmentDetails) {
  const { firstName, lastName, email, phone, notes } = payload;

  const html = wrapper(`
    ${badge("indigo", "#4F46E5", "#eef2ff", "#4338ca", "New application")}
    <h1 class="email-heading" style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#0f172a;">New QA Career Launchpad application 🚀</h1>
    <p class="email-muted" style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#64748b;">
      ${escapeHtml(firstName)} ${escapeHtml(lastName)} just applied to the QA Career Launchpad.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
      ${detailRow("Name", escapeHtml(`${firstName} ${lastName}`))}
      ${detailRow("Email", `<a href="mailto:${escapeHtml(email)}" class="email-link" style="color:#4F46E5;text-decoration:none;">${escapeHtml(email)}</a>`)}
      ${detailRow("Phone", phone ? escapeHtml(phone) : undefined)}
    </table>
    ${
      notes
        ? `<p class="email-muted" style="margin:20px 0 8px;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#94a3b8;">Notes</p>
    <p class="email-quote-bg email-quote-text" style="margin:0;font-size:14px;line-height:1.6;color:#0f172a;white-space:pre-wrap;background-color:#f8fafc;border-radius:14px;padding:18px;">${escapeHtml(notes)}</p>`
        : ""
    }
    ${button(`mailto:${email}`, `Reply to ${escapeHtml(firstName)}`)}
  `);

  const text = [
    `New QA Career Launchpad application from ${firstName} ${lastName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    notes ? `\nNotes:\n${notes}` : null,
    "",
    `Reply directly to ${email} to follow up.`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `🚀 New QA Career Launchpad application: ${firstName} ${lastName}`,
    html,
    text,
  };
}

export function launchpadConfirmationEmail(payload: LaunchpadEnrollmentDetails) {
  const { firstName } = payload;

  const steps = [
    ["1", "We review your application", "Our team looks over your details, usually within 24 hours."],
    [
      "2",
      "A mentor reaches out",
      "You'll hear from us by email or phone to confirm your spot, the cohort schedule, and payment details.",
    ],
    [
      "3",
      "You start the program",
      "Live sessions, hands-on projects, and mentor check-ins across all four phases, ending with a portfolio project and interview prep.",
    ],
  ];

  const stepsHtml = steps
    .map(
      ([number, title, desc]) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
      <tr>
        <td style="width:30px;vertical-align:top;">
          <div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#ffffff;font-size:12px;font-weight:700;text-align:center;line-height:24px;">${number}</div>
        </td>
        <td style="padding-left:12px;vertical-align:top;">
          <p class="email-heading" style="margin:0;font-size:14px;font-weight:600;color:#0f172a;">${title}</p>
          <p class="email-muted" style="margin:2px 0 0;font-size:13px;line-height:1.5;color:#64748b;">${desc}</p>
        </td>
      </tr>
    </table>`
    )
    .join("");

  const html = wrapper(`
    ${badge("emerald", "#10b981", "#ecfdf5", "#047857", "Application received")}
    <h1 class="email-heading" style="margin:0 0 8px;font-size:22px;line-height:1.3;color:#0f172a;">You're in, ${escapeHtml(firstName)}! 🎉</h1>
    <p class="email-muted" style="margin:0 0 28px;font-size:14px;line-height:1.6;color:#64748b;">
      Thanks for applying to the QA Career Launchpad. Here's what happens next:
    </p>
    ${stepsHtml}
    ${button("https://qasolucity.com/qa-career-launchpad", "Review the program details")}
    <p class="email-muted" style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#94a3b8;">
      Questions in the meantime? Reach us at
      <a href="mailto:hello@qasolucity.com" class="email-link" style="color:#4F46E5;">hello@qasolucity.com</a>.
    </p>
  `);

  const text = [
    `You're in, ${firstName}!`,
    "",
    "Thanks for applying to the QA Career Launchpad. Here's what happens next:",
    "",
    ...steps.map(([number, title, desc]) => `${number}. ${title}: ${desc}`),
    "",
    "Questions? Reach us at hello@qasolucity.com.",
  ].join("\n");

  return {
    subject: "You're in: QA Career Launchpad application received",
    html,
    text,
  };
}

// ---------------------------------------------------------------------------
// Job applications — deliberately different visual treatment from
// wrapper()/badge()/button() above. Those carry QA Solucity's marketing
// voice (gradient header, big rounded product-card look, colorful status
// pills); a job application is a more formal, document-like moment, so
// this uses a plain letterhead-style header, a thin-bordered card with
// sharp corners, and a single monochrome accent instead of the gradient.
// ---------------------------------------------------------------------------

const APPLICATION_DARK_STYLE_BLOCK = `
  @media (prefers-color-scheme: dark) {
    .app-email-bg { background-color: #0b1120 !important; }
    .app-email-card { background-color: #0f172a !important; border-color: #1e293b !important; }
    .app-email-header { border-bottom-color: #f1f5f9 !important; }
    .app-email-mark { background-color: #f1f5f9 !important; }
    .app-email-mark-text { color: #0f172a !important; }
    .app-email-wordmark { color: #f1f5f9 !important; }
    .app-email-muted { color: #94a3b8 !important; }
    .app-email-status-label { color: #64748b !important; border-bottom-color: #1e293b !important; }
    .app-email-status-value { color: #f1f5f9 !important; border-bottom-color: #1e293b !important; }
    .app-email-heading { color: #f1f5f9 !important; }
    .app-email-body { color: #cbd5e1 !important; }
    .app-email-button { background-color: #f1f5f9 !important; }
    .app-email-button-text { color: #0f172a !important; }
    .app-email-footer-bg { background-color: #0b1120 !important; border-top-color: #1e293b !important; }
    .email-value { color: #e2e8f0 !important; }
    .email-divider { border-color: #1e293b !important; }
    .email-link { color: #cbd5e1 !important; }
  }
`;

const applicationWrapper = (bodyHtml: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <style>${APPLICATION_DARK_STYLE_BLOCK}</style>
  </head>
  <body class="app-email-bg" style="margin:0;padding:0;background-color:#eef1f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="app-email-bg" style="background-color:#eef1f6;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="app-email-card" style="max-width:560px;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
            <tr>
              <td class="app-email-header" style="padding:26px 32px;border-bottom:2px solid #0f172a;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="app-email-mark" style="width:32px;height:32px;background-color:#0f172a;border-radius:6px;text-align:center;vertical-align:middle;">
                      <span class="app-email-mark-text" style="font-size:14px;font-weight:800;color:#ffffff;line-height:32px;">Q</span>
                    </td>
                    <td style="padding-left:12px;">
                      <span class="app-email-wordmark" style="color:#0f172a;font-size:15px;font-weight:700;">QA Solucity</span><br/>
                      <span class="app-email-muted" style="color:#94a3b8;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;">Careers</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td class="app-email-footer-bg" style="padding:18px 32px;background-color:#f8fafc;border-top:1px solid #eef1f6;">
                <p class="app-email-muted" style="margin:0;font-size:11px;color:#94a3b8;">
                  QA Solucity Careers &middot; Lagos, Nigeria &middot;
                  <a href="mailto:hello@qasolucity.com" class="app-email-muted" style="color:#94a3b8;">hello@qasolucity.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const applicationStatusLine = (label: string, value: string) => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
    <tr>
      <td class="app-email-status-label" style="padding:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#94a3b8;border-bottom:1px solid #e2e8f0;">${label}</td>
    </tr>
    <tr>
      <td class="app-email-status-value" style="padding:8px 0 0;font-size:16px;font-weight:700;color:#0f172a;">${value}</td>
    </tr>
  </table>
`;

const applicationButton = (href: string, label: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 4px;">
    <tr>
      <td class="app-email-button" style="border-radius:8px;background-color:#0f172a;">
        <a href="${href}" class="app-email-button-text" style="display:inline-block;padding:13px 26px;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;letter-spacing:0.01em;">
          ${label}
        </a>
      </td>
    </tr>
  </table>
`;

export interface JobApplicationDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  jobSlug: string;
  message?: string;
  resumeFilename: string;
}

export function jobApplicationInternalEmail(payload: JobApplicationDetails) {
  const { firstName, lastName, email, phone, jobTitle, jobSlug, message, resumeFilename } = payload;

  const html = applicationWrapper(`
    ${applicationStatusLine("New application", jobTitle)}
    <p class="app-email-body" style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#334155;">
      ${escapeHtml(firstName)} ${escapeHtml(lastName)} just applied for <strong>${escapeHtml(jobTitle)}</strong>. Their resume is attached to this email.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:4px;">
      ${detailRow("Name", escapeHtml(`${firstName} ${lastName}`))}
      ${detailRow("Email", `<a href="mailto:${escapeHtml(email)}" class="email-link" style="color:#0f172a;text-decoration:underline;">${escapeHtml(email)}</a>`)}
      ${detailRow("Phone", escapeHtml(phone))}
      ${detailRow("Role", escapeHtml(jobTitle))}
      ${detailRow("Resume", escapeHtml(resumeFilename))}
    </table>
    ${
      message
        ? `<p class="app-email-muted" style="margin:20px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Note from applicant</p>
    <p class="app-email-body" style="margin:0;font-size:14px;line-height:1.7;color:#334155;white-space:pre-wrap;background-color:#f8fafc;border-radius:8px;padding:16px;">${escapeHtml(message)}</p>`
        : ""
    }
    ${applicationButton(`mailto:${email}`, `Reply to ${escapeHtml(firstName)}`)}
  `);

  const text = [
    `New application for ${jobTitle} (${jobSlug})`,
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Resume: ${resumeFilename} (attached)`,
    message ? `\nNote from applicant:\n${message}` : null,
    "",
    `Reply directly to ${email} to follow up.`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `New application: ${jobTitle} — ${firstName} ${lastName}`,
    html,
    text,
  };
}

export function jobApplicationConfirmationEmail(payload: JobApplicationDetails) {
  const { firstName, jobTitle } = payload;

  const html = applicationWrapper(`
    ${applicationStatusLine("Application received", jobTitle)}
    <p class="app-email-heading" style="margin:0 0 16px;font-size:18px;font-weight:700;color:#0f172a;">
      Thanks for applying, ${escapeHtml(firstName)}.
    </p>
    <p class="app-email-body" style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#334155;">
      We've received your application for <strong>${escapeHtml(jobTitle)}</strong>, along with your resume.
      Our team reviews every application personally, no automated filtering, so it may take a little
      time to hear back.
    </p>
    <p class="app-email-body" style="margin:0;font-size:14px;line-height:1.7;color:#334155;">
      If your background looks like a fit, we'll reach out directly to set up a conversation. Either
      way, you'll hear from us.
    </p>
    ${applicationButton("https://qasolucity.com/careers", "View other open roles")}
  `);

  const text = [
    `Thanks for applying, ${firstName}.`,
    "",
    `We've received your application for ${jobTitle}, along with your resume. Our team reviews every`,
    "application personally, no automated filtering, so it may take a little time to hear back.",
    "",
    "If your background looks like a fit, we'll reach out directly to set up a conversation. Either way,",
    "you'll hear from us.",
    "",
    "Other open roles: https://qasolucity.com/careers",
  ].join("\n");

  return {
    subject: `Application received: ${jobTitle}`,
    html,
    text,
  };
}
