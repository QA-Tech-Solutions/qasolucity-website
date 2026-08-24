import { ImageResponse } from "next/og";

export const alt = "QA Solucity | Where Quality Meets Innovation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #0b0f2e 50%, #1a0e1f 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              fontSize: 48,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            Q
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            QA Solucity
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            fontWeight: 500,
            background: "linear-gradient(90deg, #818cf8, #c4b5fd)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Where Quality Meets Innovation
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          Software Testing · QA Consulting · Test Automation
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
