import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { closeStartedEventSales } from "@/lib/api/operations";

export async function POST() {
  try {
    const ctx = await getAuthContext();
    const result = await closeStartedEventSales(ctx);
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
