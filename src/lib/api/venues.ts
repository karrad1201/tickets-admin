import { AuthContext, backendHeaders } from "../auth";
import { apiFetch } from "./client";
import { Venue } from "./types";

export const listVenues = (ctx: AuthContext) =>
  apiFetch<Venue[]>("/api/v1/venues", backendHeaders(ctx), { next: { revalidate: 30 } });

export const getVenue = (ctx: AuthContext, id: string) =>
  apiFetch<Venue>(`/api/v1/venues/${id}`, backendHeaders(ctx), { cache: "no-store" });
