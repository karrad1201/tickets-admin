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

export interface CreateEventBody {
  label: string;
  description: string;
  venueId: string;
  categoryId: string;
  ageRating: string;
  time: string;
}

export const createEvent = (ctx: AuthContext, body: CreateEventBody) =>
  apiFetch<Event>("/api/v1/events", backendHeaders(ctx), {
    method: "POST",
    body: JSON.stringify(body),
    cache: "no-store",
  });

export interface CreateInventoryBody {
  label: string;
  price: number;
  quota?: number;
}

export const createInventory = (ctx: AuthContext, eventId: string, body: CreateInventoryBody) =>
  apiFetch<unknown>(`/api/v1/inventory/${eventId}/ticket-types`, backendHeaders(ctx), {
    method: "POST",
    body: JSON.stringify(body),
    cache: "no-store",
  });

export interface InventoryPlan {
  mode: "GENERAL_ADMISSION" | "SEATED";
  admissionInventory: { ticketTypeId: string; label: string; price: number; capacity: number; sold: number; available: number }[];
  seatInventory: { seatNumber: string; status: "AVAILABLE" | "RESERVED" | "SOLD" }[];
}

export const getInventoryPlan = (ctx: AuthContext, eventId: string) =>
  apiFetch<InventoryPlan>(`/api/v1/inventory-plans/${eventId}`, backendHeaders(ctx), {
    cache: "no-store",
  });
