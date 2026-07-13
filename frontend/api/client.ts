import { createHttpClient } from "@/lib/http-client";
import { getStoredToken } from "@/lib/auth-client";

export const apiClient = createHttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  getToken: getStoredToken,
});
