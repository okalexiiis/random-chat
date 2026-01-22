// src/services/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_PUBLIC_API_URL;

type FetchOptions<B> = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: B;
  headers?: HeadersInit;
  cache?: RequestCache;
};

export const apiFetch = async <R, B = undefined>(
  endpoint: string,
  options: FetchOptions<B> = {},
): Promise<R> => {
  console.log("[apiFetch] BASE_URL:", `${BASE_URL}`);
  console.log("[apiFetch] ENDPOINT:", `${endpoint}`);
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: options.cache ?? "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: "Error en la petición" }));
    throw new Error(errorData.error || errorData.message || "Error en la petición");
  }

  return res.json() as Promise<R>;
};
