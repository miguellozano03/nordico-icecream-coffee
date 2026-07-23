import { apiClient } from "./client";
import type {
  Product,
  PaginatedProducts,
  ProductQuery,
  ProductCreate,
  ProductUpdate,
} from "./schemas";

function toFormData(data: Partial<ProductCreate>, image?: File) {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) fd.append(key, String(value));
  });
  if (image) fd.append("image", image);
  return fd;
}

function normalizeProduct(p: Product): Product {
  return {
    ...p,
    price: Number(p.price),
    image: p.image
      ? p.image.startsWith("http")
        ? p.image
        : `${process.env.NEXT_PUBLIC_API_URL}${p.image}`
      : undefined,
  };
}
export const productsApi = {
  getAll: (query: ProductQuery = {}) =>
    apiClient.get<PaginatedProducts>("/api/v1/products", { params: query }).then((r) => ({
      ...r.data,
      data: r.data.data.map(normalizeProduct),
    })),

  getOne: (id: string) =>
    apiClient.get<Product>(`/api/v1/products/${id}`).then((r) => normalizeProduct(r.data)),

  create: (data: ProductCreate, image?: File) =>
    apiClient
      .post<Product>("/api/v1/products", toFormData(data, image))
      .then((r) => normalizeProduct(r.data)),

  update: (id: string, data: ProductUpdate, image?: File) =>
    apiClient
      .patch<Product>(`/api/v1/products/${id}`, toFormData(data, image))
      .then((r) => normalizeProduct(r.data)),

  remove: (id: string) => apiClient.delete<void>(`/api/v1/products/${id}`).then((r) => r.data),
};
