import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { patchUserRole } from "@/lib/api/users";
import { revalidatePath } from "next/cache";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const ctx = await getAuthContext();
    const body = await req.json();
    const result = await patchUserRole(ctx, id, body.role);
    revalidatePath(`/users/${id}`);
    revalidatePath("/users");
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    const status = e instanceof Error && "status" in e ? (e as { status: number }).status : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
