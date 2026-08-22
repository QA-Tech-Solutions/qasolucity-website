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
    subject: "We've received your message — QA Solucity",
    html,
    text,
  };
}
