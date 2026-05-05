import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";
const ACCESS_TTL_SECONDS = 15 * 60;
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60;
const SECURE = process.env.AUTH_COOKIE_SECURE === "true";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "no_refresh_token" }, { status: 401 });
  }

  try {
    const res = await fetch(`${BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "refresh_failed" }, { status: 401 });
    }

    const { accessToken, refreshToken: newRefreshToken } = await res.json();

    const response = NextResponse.json({ ok: true });
    const base = { httpOnly: true, secure: SECURE, sameSite: "strict" as const, path: "/" };

    response.cookies.set("auth_token", accessToken, { ...base, maxAge: ACCESS_TTL_SECONDS });
    response.cookies.set("refresh_token", newRefreshToken, { ...base, maxAge: REFRESH_TTL_SECONDS });
    const expiresAt = Math.floor(Date.now() / 1000) + ACCESS_TTL_SECONDS - 30;
    response.cookies.set("token_expires_at", String(expiresAt), { ...base, maxAge: REFRESH_TTL_SECONDS });

    return response;
  } catch {
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
