import { AuthContext, backendHeaders } from "../auth";
import { apiFetch } from "./client";
import { Category } from "./types";

export const listCategories = (ctx: AuthContext) =>
  apiFetch<Category[]>("/api/v1/categories", backendHeaders(ctx), { next: { revalidate: 60 } });

export const getCategory = (ctx: AuthContext, id: string) =>
  apiFetch<Category>(`/api/v1/categories/${id}`, backendHeaders(ctx), { next: { revalidate: 60 } });

export const createCategory = (ctx: AuthContext, body: { code: string; label: string }) =>
  apiFetch<Category>("/api/v1/categories", backendHeaders(ctx), {
    method: "POST",
    body: JSON.stringify(body),
    cache: "no-store",
  });
