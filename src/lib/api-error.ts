import { NextResponse } from "next/server";

/** Извлекает HTTP-статус из ошибки если она содержит поле status */
function errorStatus(e: unknown): number {
  if (e instanceof Error && "status" in e && typeof (e as { status: unknown }).status === "number") {
    return (e as { status: number }).status;
  }
  return 500;
}

/** Универсальный обработчик ошибок для API routes */
export function apiErrorResponse(e: unknown): NextResponse {
  const msg = e instanceof Error ? e.message : "Внутренняя ошибка сервера";
  return NextResponse.json({ error: msg }, { status: errorStatus(e) });
}
