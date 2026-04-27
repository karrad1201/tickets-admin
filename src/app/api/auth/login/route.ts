import { NextRequest, NextResponse } from "next/server";

const MAX_AGE = Number(process.env.AUTH_COOKIE_MAX_AGE ?? 86400);
const SECURE = process.env.AUTH_COOKIE_SECURE === "true";

export async function POST(req: NextRequest) {
  const { token, userId } = await req.json();
  if (!token || !userId) {
    return NextResponse.json({ error: "token and userId required" }, { status: 400 });
  }

  const res = NextResponse.json({ ok: true });
  const cookieOpts = {
    httpOnly: true,
    secure: SECURE,
    sameSite: "lax" as const,
    maxAge: MAX_AGE,
    path: "/",
  };
  res.cookies.set("auth_token", token, cookieOpts);
  res.cookies.set("user_id", userId, cookieOpts);
  return res;
}
