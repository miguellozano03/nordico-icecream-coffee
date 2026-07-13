import axios, { AxiosInstance } from "axios";

interface HttpClientConfig {
  baseUrl: string;
  getToken?: () => string | null | Promise<string | null>;
}

export function createHttpClient({
  baseUrl,
  getToken,
}: HttpClientConfig): AxiosInstance {
  const instance = axios.create({ baseURL: baseUrl });

  instance.interceptors.request.use(async (config) => {
    if (getToken && config.headers.Authorization === undefined) {
      const token = await getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("bearer_token");
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
