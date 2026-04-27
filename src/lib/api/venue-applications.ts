import { AuthContext, backendHeaders } from "../auth";
import { apiFetch } from "./client";
import { VenueApplication } from "./types";

export const listVenueApplications = (ctx: AuthContext, status?: string) =>
  apiFetch<VenueApplication[]>(
    `/api/v1/venue-applications${status ? `?status=${status}` : ""}`,
    backendHeaders(ctx),
    { next: { revalidate: 30 } },
  );

export const getVenueApplication = (ctx: AuthContext, id: string) =>
  apiFetch<VenueApplication>(`/api/v1/venue-applications/${id}`, backendHeaders(ctx), {
    cache: "no-store",
  });

export const approveVenueApplication = (ctx: AuthContext, id: string) =>
  apiFetch<VenueApplication>(`/api/v1/venue-applications/${id}/approve`, backendHeaders(ctx), {
    method: "POST",
    cache: "no-store",
  });

export const rejectVenueApplication = (ctx: AuthContext, id: string) =>
  apiFetch<VenueApplication>(`/api/v1/venue-applications/${id}/reject`, backendHeaders(ctx), {
    method: "POST",
    cache: "no-store",
  });
