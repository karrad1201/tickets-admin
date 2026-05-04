import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
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
    return apiErrorResponse(e);
  }
}
