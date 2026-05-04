import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("apply_token")?.value;
  if (!token) return NextResponse.json({ role: null }, { status: 401 });

  const res = await fetch(`${BACKEND}/api/v1/my/organization/membership`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 404) return NextResponse.json({ role: null });
  if (!res.ok) return NextResponse.json({ role: null });
  const data: { role: string } = await res.json().catch(() => ({ role: null }));
  return NextResponse.json({ role: data.role });
}
