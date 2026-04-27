import { AuthContext, backendHeaders } from "../auth";
import { apiFetch } from "./client";
import { Event } from "./types";

export const listEvents = (ctx: AuthContext) =>
  apiFetch<Event[]>("/api/v1/events", backendHeaders(ctx), { next: { revalidate: 30 } });

export const getEvent = (ctx: AuthContext, id: string) =>
  apiFetch<Event>(`/api/v1/events/${id}`, backendHeaders(ctx), { cache: "no-store" });

export const closeEventSales = (ctx: AuthContext, id: string) =>
  apiFetch<Event>(`/api/v1/events/${id}/close-sales`, backendHeaders(ctx), {
    method: "POST",
    cache: "no-store",
  });
