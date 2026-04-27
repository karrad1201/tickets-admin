import { AuthContext, backendHeaders } from "../auth";
import { apiFetch } from "./client";

export const closeStartedEventSales = (ctx: AuthContext) =>
  apiFetch<{ processed: number }>(
    "/api/v1/operations/close-started-event-sales",
    backendHeaders(ctx),
    { method: "POST", cache: "no-store" },
  );

export const processStalePayments = (ctx: AuthContext) =>
  apiFetch<{ processed: number }>(
    "/api/v1/operations/process-stale-payments",
    backendHeaders(ctx),
    { method: "POST", cache: "no-store" },
  );
