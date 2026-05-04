import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { getAuthContext } from "@/lib/auth";
import { rejectVenueApplication } from "@/lib/api/venue-applications";
import { revalidatePath } from "next/cache";
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const ctx = await getAuthContext();
    const result = await rejectVenueApplication(ctx, id);
    revalidatePath("/venue-applications");
    return NextResponse.json(result);
  } catch (e) {
    return apiErrorResponse(e);
  }
}
