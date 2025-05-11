import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = req.body;
  const backendUrl = process.env.DEPLOYED_URL || "http://localhost:8000";

  const backendRes = await fetch(`${backendUrl}/api/match`, {
    method: "POST",
    headers: {
      "content-type": req.headers.get("content-type") || "",
    },
    body: JSON.stringify(body),
  });

  const contentType = backendRes.headers.get("content-type");
  const text = await backendRes.text();

  if (contentType && contentType.includes("application/json")) {
    return NextResponse.json(JSON.parse(text), { status: backendRes.status });
  } else {
    console.error("Backend did not return JSON:", text);
    return new NextResponse(text, { status: backendRes.status });
  }
}