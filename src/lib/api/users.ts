import { AuthContext, backendHeaders } from "../auth";
import { apiFetch } from "./client";
import { OrgMember, User } from "./types";

export const listUsers = (ctx: AuthContext) =>
  apiFetch<User[]>("/api/v1/users", backendHeaders(ctx), { next: { revalidate: 30 } });

export const getUser = (ctx: AuthContext, id: string) =>
  apiFetch<User>(`/api/v1/users/${id}`, backendHeaders(ctx), { cache: "no-store" });

export const listUserMemberships = (ctx: AuthContext, userId: string) =>
  apiFetch<OrgMember[]>(`/api/v1/organization-members?userId=${userId}`, backendHeaders(ctx), {
    cache: "no-store",
  });
