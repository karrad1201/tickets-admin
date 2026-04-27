import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface AuthContext {
  token: string;
  userId: string;
}

export async function getAuthContext(): Promise<AuthContext> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  const userId = cookieStore.get("user_id")?.value;
  if (!token || !userId) redirect("/login");
  return { token, userId };
}

export function backendHeaders(ctx: AuthContext): HeadersInit {
  return {
    Authorization: `Bearer ${ctx.token}`,
    "X-User-Id": ctx.userId,
    "Content-Type": "application/json",
  };
}
