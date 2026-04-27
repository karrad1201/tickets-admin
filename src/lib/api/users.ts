import { AuthContext, backendHeaders } from "../auth";
import { apiFetch } from "./client";
import { User } from "./types";

export const listUsers = (ctx: AuthContext) =>
  apiFetch<User[]>("/api/v1/users", backendHeaders(ctx), { next: { revalidate: 30 } });

export const getUser = (ctx: AuthContext, id: string) =>
  apiFetch<User>(`/api/v1/users/${id}`, backendHeaders(ctx), { cache: "no-store" });
