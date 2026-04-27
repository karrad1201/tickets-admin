import { AuthContext, backendHeaders } from "../auth";
import { apiFetch } from "./client";
import { OrgApplication } from "./types";

export const listOrgApplications = (ctx: AuthContext) =>
  apiFetch<OrgApplication[]>("/api/v1/organization-applications", backendHeaders(ctx), {
    next: { revalidate: 30 },
  });

export const getOrgApplication = (ctx: AuthContext, id: string) =>
  apiFetch<OrgApplication>(`/api/v1/organization-applications/${id}`, backendHeaders(ctx), {
    cache: "no-store",
  });

export const approveOrgApplication = (ctx: AuthContext, id: string) =>
  apiFetch<OrgApplication>(`/api/v1/organization-applications/${id}/approve`, backendHeaders(ctx), {
    method: "POST",
    cache: "no-store",
  });

export const rejectOrgApplication = (ctx: AuthContext, id: string) =>
  apiFetch<OrgApplication>(`/api/v1/organization-applications/${id}/reject`, backendHeaders(ctx), {
    method: "POST",
    cache: "no-store",
  });
