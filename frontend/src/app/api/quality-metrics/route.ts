import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "quality-metrics.json");

export interface QualityMetrics {
  passRate: number;
  passedTests: number;
  totalTests: number;
  bugs: number;
  coverage: number;
  apiHealth: "Healthy" | "Degraded";
  lastUpdated: string | null;
  source: "seed" | "automation";
}

function isValidMetrics(payload: unknown): payload is QualityMetrics {
  if (typeof payload !== "object" || payload === null) return false;
  const p = payload as Record<string, unknown>;
  return (
    typeof p.passRate === "number" &&
    typeof p.passedTests === "number" &&
    typeof p.totalTests === "number" &&
    typeof p.bugs === "number" &&
    typeof p.coverage === "number" &&
    (p.apiHealth === "Healthy" || p.apiHealth === "Degraded")
  );
}

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json(
      { error: "No metrics available yet" },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  const token = process.env.AUTOMATION_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "Automation reporting is not configured" },
      { status: 500 }
    );
  }

  const authHeader = request.headers.get("authorization") ?? "";
  if (authHeader !== `Bearer ${token}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();
  if (!isValidMetrics(payload)) {
    return NextResponse.json({ error: "Invalid metrics payload" }, { status: 400 });
  }

  const metrics: QualityMetrics = {
    ...payload,
    lastUpdated: new Date().toISOString(),
    source: "automation",
  };

  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(metrics, null, 2));
  } catch {
    // Serverless hosts (Vercel, Netlify, ...) ship a read-only filesystem
    // in production, so this write silently no-ops there. See the
    // qasolucity-automation README for the production persistence options
    // (KV store, external DB, or a git-committed results file) — this
    // file-based store only works for local dev right now.
    return NextResponse.json(
      {
        error:
          "Metrics could not be persisted (read-only filesystem). This endpoint currently only works in local dev.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, metrics });
}
