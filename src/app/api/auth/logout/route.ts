import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const authToken = req.cookies.get("auth_token")?.value;

  // Ревокация токенов на бэкенде (best-effort, не блокируем при ошибке)
  if (authToken) {
    fetch(`${BASE}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: refreshToken ? JSON.stringify({ refreshToken }) : undefined,
    }).catch(() => {});
  }

  const res = NextResponse.json({ ok: true });
  const clear = { maxAge: 0, path: "/" };
  res.cookies.set("auth_token", "", clear);
  res.cookies.set("refresh_token", "", clear);
  res.cookies.set("user_id", "", clear);
  res.cookies.set("token_expires_at", "", clear);
  return res;
}
