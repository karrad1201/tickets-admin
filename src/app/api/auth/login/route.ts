import { NextRequest, NextResponse } from "next/server";

const ACCESS_TTL_SECONDS = 15 * 60; // 15 минут — соответствует backend
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 дней
const SECURE = process.env.AUTH_COOKIE_SECURE === "true";

export async function POST(req: NextRequest) {
  const { accessToken, refreshToken, userId } = await req.json();
  if (!accessToken || !refreshToken || !userId) {
    return NextResponse.json({ error: "accessToken, refreshToken and userId required" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  const base = { httpOnly: true, secure: SECURE, sameSite: "strict" as const, path: "/" };

  res.cookies.set("auth_token", accessToken, { ...base, maxAge: ACCESS_TTL_SECONDS });
  res.cookies.set("refresh_token", refreshToken, { ...base, maxAge: REFRESH_TTL_SECONDS });
  res.cookies.set("user_id", userId, { ...base, maxAge: REFRESH_TTL_SECONDS });
  // Unix-секунды истечения access token, с запасом 30 сек для обновления в middleware
  const expiresAt = Math.floor(Date.now() / 1000) + ACCESS_TTL_SECONDS - 30;
  res.cookies.set("token_expires_at", String(expiresAt), { ...base, maxAge: REFRESH_TTL_SECONDS });

  return res;
}
