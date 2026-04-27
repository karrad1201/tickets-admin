import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { rejectOrgApplication } from "@/lib/api/org-applications";
import { revalidatePath } from "next/cache";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const ctx = await getAuthContext();
    const result = await rejectOrgApplication(ctx, id);
    revalidatePath("/org-applications");
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "error";
    const status = e instanceof Error && "status" in e ? (e as { status: number }).status : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
