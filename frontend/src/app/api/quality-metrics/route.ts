import { NextResponse } from "next/server";
import {
  getMetrics,
  setMetrics,
  type QualityMetrics,
} from "@/lib/quality-metrics-store";

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
  const metrics = await getMetrics();
  if (!metrics) {
    return NextResponse.json({ error: "No metrics available yet" }, { status: 503 });
  }
  return NextResponse.json(metrics);
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
    await setMetrics(metrics);
  } catch {
    return NextResponse.json(
      { error: "Metrics could not be persisted" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, metrics });
}
