import { NextRequest, NextResponse } from "next/server";

const getBackendBase = () =>
  (process.env.DEPLOYED_URL || "http://localhost:8000").replace(/\/$/, "");

// ✅ Stop random GETs from breaking things
export async function GET() {
  return NextResponse.json({ ok: true, message: "match route alive" });
}

export async function POST(req: NextRequest) {
  const backendBase = getBackendBase();
  const upstreamUrl = `${backendBase}/api/match`;

  // ✅ Read the body safely (works for JSON + FormData uploads)
  const body = await req.arrayBuffer();

  let backendRes: Response;
  try {
    backendRes = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        // forward content-type so backend can parse (FormData boundary, JSON, etc.)
        "content-type": req.headers.get("content-type") || "application/octet-stream",
      },
      body,
    });
  } catch (e: any) {
    // ✅ If upstream is unreachable, return JSON (not HTML) so frontend won't crash
    return NextResponse.json(
      {
        error: "Upstream fetch failed",
        upstreamUrl,
        message: e?.message || String(e),
      },
      { status: 502 }
    );
  }

  const contentType = backendRes.headers.get("content-type") || "";
  const text = await backendRes.text();

  // ✅ If upstream returned JSON, pass it through (without re-JSON-encoding)
  if (contentType.includes("application/json")) {
    return new NextResponse(text, {
      status: backendRes.status,
      headers: { "content-type": "application/json" },
    });
  }

  // ✅ If upstream returned HTML/text (“The deploy…”, 503 pages, etc), wrap into JSON
  return NextResponse.json(
    {
      error: "Upstream did not return JSON",
      upstreamUrl,
      status: backendRes.status,
      contentType,
      bodyPreview: text.slice(0, 2000),
    },
    { status: backendRes.status }
  );
}
