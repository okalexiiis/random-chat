// src/services/http.ts
import { apiFetch } from "./api";

export const get = <T>(url: string) => apiFetch<T>(url);

export const post = <T, B>(url: string, data: B) =>
  apiFetch<T, B>(url, {
    method: "POST",
    body: data,
  });

export const put = <T, B>(url: string, data: B) =>
  apiFetch<T, B>(url, {
    method: "PUT",
    body: data,
  });

export const del = <T>(url: string) =>
  apiFetch<T>(url, {
    method: "DELETE",
  });
