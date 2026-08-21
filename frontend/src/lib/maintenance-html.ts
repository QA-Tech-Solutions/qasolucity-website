export function getMaintenanceHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Under Maintenance | QA Solucity</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: linear-gradient(to bottom, #f1f5f9, #ffffff 60%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif;
    position: relative;
    overflow: hidden;
  }
  .glow {
    position: absolute;
    border-radius: 9999px;
    filter: blur(140px);
    z-index: -1;
  }
  .glow-left { left: -120px; top: -60px; width: 480px; height: 480px; background: rgba(199, 210, 254, 0.45); }
  .glow-right { right: -140px; bottom: -80px; width: 520px; height: 520px; background: rgba(221, 214, 254, 0.45); }
  .card {
    position: relative;
    max-width: 560px;
    width: 100%;
    text-align: center;
    background: #ffffff;
    border: 1px solid rgba(226, 232, 240, 0.8);
    border-radius: 32px;
    padding: 56px 40px;
    box-shadow: 0 30px 80px rgba(15, 23, 42, 0.08);
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 1px 2px rgba(79, 70, 229, 0.08);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #334155;
  }
  .dot-wrap { position: relative; display: inline-flex; width: 8px; height: 8px; }
  .dot-ping {
    position: absolute; inset: 0; border-radius: 9999px;
    background: #fbbf24; opacity: 0.75;
    animation: ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  .dot-core { position: relative; width: 8px; height: 8px; border-radius: 9999px; background: #f59e0b; }
  @keyframes ping {
    75%, 100% { transform: scale(2.4); opacity: 0; }
  }
  .num {
    margin: 40px 0 0;
    font-size: 76px;
    font-weight: 900;
    line-height: 1;
    background: linear-gradient(to right, #4f46e5, #8b5cf6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  h1 {
    margin: 24px 0 0;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: #0f172a;
  }
  p.sub {
    margin: 20px auto 0;
    max-width: 420px;
    font-size: 17px;
    line-height: 1.7;
    color: #475569;
  }
  .bar {
    margin: 32px auto 0;
    height: 6px;
    width: 220px;
    border-radius: 9999px;
    background: #eef2ff;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    width: 40%;
    border-radius: 9999px;
    background: linear-gradient(to right, #4f46e5, #8b5cf6);
    animation: shimmer 1.8s ease-in-out infinite;
  }
  @keyframes shimmer {
    0% { transform: translateX(-120%); }
    100% { transform: translateX(360%); }
  }
  .contact {
    margin-top: 32px;
    font-size: 14px;
    color: #94a3b8;
  }
  .contact a { color: #4f46e5; text-decoration: none; font-weight: 600; }
  .contact a:hover { text-decoration: underline; }
</style>
</head>
<body>
  <div class="glow glow-left"></div>
  <div class="glow glow-right"></div>
  <main class="card">
    <span class="badge">
      <span class="dot-wrap"><span class="dot-ping"></span><span class="dot-core"></span></span>
      Maintenance Mode
    </span>

    <p class="num">503</p>
    <h1>We'll be right back.</h1>
    <p class="sub">
      QA Solucity is currently undergoing scheduled maintenance to improve
      your experience. We won't be long, thanks for your patience.
    </p>

    <div class="bar"><div class="bar-fill"></div></div>

    <p class="contact">
      Urgent enquiry? Email <a href="mailto:hello@qasolucity.com">hello@qasolucity.com</a>
    </p>
  </main>
</body>
</html>`;
}
