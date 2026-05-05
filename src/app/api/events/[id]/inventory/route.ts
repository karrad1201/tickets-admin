import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { createInventory } from "@/lib/api/events";
import { apiErrorResponse } from "@/lib/api-error";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const ctx = await getAuthContext();
    const body = await req.json();
    const result = await createInventory(ctx, id, body);
    revalidatePath(`/events/${id}`);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return apiErrorResponse(e);
  }
}
