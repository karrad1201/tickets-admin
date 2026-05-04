import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";
import { getAuthContext } from "@/lib/auth";
import { closeStartedEventSales } from "@/lib/api/operations";

export async function POST() {
  try {
    const ctx = await getAuthContext();
    const result = await closeStartedEventSales(ctx);
    return NextResponse.json(result);
  } catch (e) {


    return apiErrorResponse(e);
  }
}
