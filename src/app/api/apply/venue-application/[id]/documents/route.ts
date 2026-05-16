import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("apply_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const res = await fetch(
    `${BACKEND}/api/v1/my/organization/venue-applications/${params.id}/documents`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      // @ts-expect-error — FormData is acceptable here
      body: formData,
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
