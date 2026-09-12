import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "QA Solucity | Where Quality Meets Innovation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Small monoline icons for the feature row - kept to basic shapes
// (circles, straight lines, simple paths) since Satori's renderer only
// supports a plain SVG subset, not the blur/shadow a hand-illustrated
// icon set would use.
function SearchIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="#4F46E5" strokeWidth="2" />
      <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 L13 2 Z" fill="#4F46E5" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 L20 5.5 V11 C20 16 16.5 20 12 22 C7.5 20 4 16 4 11 V5.5 L12 2 Z"
        stroke="#4F46E5"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8.5 12 L11 14.5 L16 9" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 L22 8 L12 13 L2 8 Z" fill="#4F46E5" />
      <path d="M6 10.5 V16 C6 17.5 8.5 19 12 19 C15.5 19 18 17.5 18 16 V10.5" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const pillars = [
  { icon: SearchIcon, label: "Testing" },
  { icon: BoltIcon, label: "Automation" },
  { icon: ShieldCheckIcon, label: "Consulting" },
  { icon: CapIcon, label: "Training" },
];

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/logos/qa-solucity-logo.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "sans-serif",
        }}
      >
        {/* Content panel */}
        <div
          style={{
            width: 700,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            background: "linear-gradient(160deg, #fbfaf8 0%, #f1f0fb 100%)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img src={logoSrc} width={52} height={52} alt="" />
              <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.01em" }}>
                QA Solucity
              </div>
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 56,
                fontSize: 50,
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#0f172a",
                letterSpacing: "-0.02em",
                maxWidth: 560,
              }}
            >
              Where Quality Meets Innovation.
            </div>

            <div
              style={{
                display: "flex",
                marginTop: 20,
                fontSize: 22,
                color: "#475569",
                maxWidth: 520,
              }}
            >
              Software testing, automation, and QA consulting for teams that ship with confidence.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: 32 }}>
              {pillars.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <Icon />
                  <div style={{ display: "flex", fontSize: 18, fontWeight: 500, color: "#1e293b" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", marginTop: 28, fontSize: 18, color: "#64748b" }}>
              qasolucity.com
            </div>
          </div>
        </div>

        {/* Brand panel */}
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(155deg, #4F46E5 0%, #3730A3 55%, #1e1b4b 100%)",
          }}
        >
          <img src={logoSrc} width={280} height={280} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
