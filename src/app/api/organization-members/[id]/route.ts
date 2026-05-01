import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const ctx = await getAuthContext();
    const res = await fetch(`${BACKEND}/api/v1/organization-members/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${ctx.token}`,
        "X-User-Id": ctx.userId,
      },
    });
    if (res.status === 204) return new NextResponse(null, { status: 204 });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (e) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
