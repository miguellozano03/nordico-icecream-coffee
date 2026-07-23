import { createAuthClient } from "better-auth/react";

const TOKEN_KEY = "bearer_token";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  basePath: "/api/v1/auth/",
  fetchOptions: {
    onSuccess: (ctx) => {
      const token = ctx.response.headers.get("set-auth-token");
      if (token) localStorage.setItem(TOKEN_KEY, token);
    },
    onError: (ctx) => {
      if (ctx.response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
      }
    },
  },
});

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}
