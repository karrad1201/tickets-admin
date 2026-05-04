import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";
const ACCESS_TTL = 15 * 60;
const SECURE = process.env.AUTH_COOKIE_SECURE === "true";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${BACKEND}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) return NextResponse.json(data, { status: res.status });

  const { accessToken, user } = data;
  const response = NextResponse.json({ userId: user.id });
  const base = { httpOnly: true, secure: SECURE, sameSite: "strict" as const, path: "/" };
  response.cookies.set("apply_token", accessToken, { ...base, maxAge: ACCESS_TTL });
  response.cookies.set("apply_user_id", user.id, { ...base, maxAge: ACCESS_TTL });
  return response;
}
