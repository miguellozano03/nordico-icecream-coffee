import { apiClient } from "./client";
import type { Category, CategoryCreate, CategoryUpdate } from "./schemas";

export const categoriesApi = {
  getAll: () =>
    apiClient.get<Category[]>("/api/v1/categories").then((r) => r.data),

  getOne: (id: string) =>
    apiClient.get<Category>(`/api/v1/categories/${id}`).then((r) => r.data),

  create: (data: CategoryCreate) =>
    apiClient.post<Category>("/api/v1/categories", data).then((r) => r.data),

  update: (id: string, data: CategoryUpdate) =>
    apiClient
      .patch<Category>(`/api/v1/categories/${id}`, data)
      .then((r) => r.data),

  remove: (id: string) =>
    apiClient.delete<void>(`/api/v1/categories/${id}`).then((r) => r.data),
};
