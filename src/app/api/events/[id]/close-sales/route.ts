import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { closeEventSales } from "@/lib/api/events";
import { revalidatePath } from "next/cache";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const ctx = await getAuthContext();
    const result = await closeEventSales(ctx, id);
    revalidatePath("/events");
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
