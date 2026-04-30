import { AuthContext, backendHeaders } from "../auth";
import { apiFetch } from "./client";
import { OrgMember, Organization } from "./types";

export const listOrganizations = (ctx: AuthContext) =>
  apiFetch<Organization[]>("/api/v1/organizations", backendHeaders(ctx), {
    next: { revalidate: 30 },
  });

export const getOrganization = (ctx: AuthContext, id: string) =>
  apiFetch<Organization>(`/api/v1/organizations/${id}`, backendHeaders(ctx), {
    cache: "no-store",
  });

export const listOrgMembers = (ctx: AuthContext, orgId: string) =>
  apiFetch<OrgMember[]>(`/api/v1/organization-members?organizationId=${orgId}`, backendHeaders(ctx), {
    cache: "no-store",
  });
