import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";
const ACCESS_TTL_SECONDS = 15 * 60;
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60;
const SECURE = process.env.AUTH_COOKIE_SECURE === "true";

export async function GET(req: NextRequest) {
  const next = req.nextUrl.searchParams.get("next") ?? "/dashboard";
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const res = await fetch(`${BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const { accessToken, refreshToken: newRefreshToken } = await res.json();

    const redirect = NextResponse.redirect(new URL(next, req.url));
    const base = { httpOnly: true, secure: SECURE, sameSite: "strict" as const, path: "/" };

    redirect.cookies.set("auth_token", accessToken, { ...base, maxAge: ACCESS_TTL_SECONDS });
    redirect.cookies.set("refresh_token", newRefreshToken, { ...base, maxAge: REFRESH_TTL_SECONDS });
    const expiresAt = Math.floor(Date.now() / 1000) + ACCESS_TTL_SECONDS - 30;
    redirect.cookies.set("token_expires_at", String(expiresAt), { ...base, maxAge: REFRESH_TTL_SECONDS });

    return redirect;
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
