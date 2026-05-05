import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/apply", "/api/auth/login", "/api/auth/logout", "/api/auth/refresh", "/api/health", "/api/admin/login", "/api/apply"];

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";
const ACCESS_TTL_SECONDS = 15 * 60;
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60;
const SECURE = process.env.AUTH_COOKIE_SECURE === "true";

function getJwtRole(token: string): string | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const token = req.cookies.get("auth_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Если access token истёк — обновляем inline через бекенд (без GET-редиректа)
  const expiresAt = Number(req.cookies.get("token_expires_at")?.value ?? "0");
  if (expiresAt && Date.now() / 1000 > expiresAt) {
    const refreshToken = req.cookies.get("refresh_token")?.value;
    if (!refreshToken) return NextResponse.redirect(new URL("/login", req.url));

    try {
      const res = await fetch(`${BASE}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) return NextResponse.redirect(new URL("/login", req.url));

      const { accessToken, refreshToken: newRefreshToken } = await res.json();
      const response = NextResponse.next();
      const base = { httpOnly: true, secure: SECURE, sameSite: "strict" as const, path: "/" };
      response.cookies.set("auth_token", accessToken, { ...base, maxAge: ACCESS_TTL_SECONDS });
      response.cookies.set("refresh_token", newRefreshToken, { ...base, maxAge: REFRESH_TTL_SECONDS });
      const newExpiry = Math.floor(Date.now() / 1000) + ACCESS_TTL_SECONDS - 30;
      response.cookies.set("token_expires_at", String(newExpiry), { ...base, maxAge: REFRESH_TTL_SECONDS });
      return response;
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // RBAC: только пользователи с ролью ADMIN допускаются в защищённые маршруты
  const role = getJwtRole(token);
  if (role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
