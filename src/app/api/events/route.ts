import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { createEvent } from "@/lib/api/events";
import { apiErrorResponse } from "@/lib/api-error";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const ctx = await getAuthContext();
    const body = await req.json();
    const event = await createEvent(ctx, body);
    revalidatePath("/events");
    return NextResponse.json(event, { status: 201 });
  } catch (e) {
    return apiErrorResponse(e);
  }
}
