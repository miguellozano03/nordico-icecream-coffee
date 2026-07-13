import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "@/api/products";
import type { ProductCreate, ProductQuery, ProductUpdate } from "@/api/schemas";

function key(query: ProductQuery = {}) {
  return ["products", query] as const;
}

export function useProducts(query: ProductQuery = {}) {
  return useQuery({
    queryKey: key(query),
    queryFn: () => productsApi.getAll(query),
    placeholderData: (prev) => prev,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productsApi.getOne(id),
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ data, image }: { data: ProductCreate; image?: File }) =>
      productsApi.create(data, image),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
      image,
    }: {
      id: string;
      data: ProductUpdate;
      image?: File;
    }) => productsApi.update(id, data, image),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
