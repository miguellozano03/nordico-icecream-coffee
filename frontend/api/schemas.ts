export interface Category {
  id: string;
  name: string;
}

export interface CategoryCreate {
  name: string;
}

export type CategoryUpdate = Partial<CategoryCreate>;

// Lo que devuelve el backend en GET /products
export interface Product {
  id: string;
  categoryId: string;
  category: Category; // objeto anidado, no string
  image?: string;
  title: string;
  description: string;
  price: number; // el backend puede mandarlo como string (numeric/decimal) -> normalizar al leer
}

// Lo que el backend espera al crear/actualizar: categoryId, no category
export interface ProductCreate {
  categoryId: string;
  title: string;
  description: string;
  price: number;
}

export type ProductUpdate = Partial<ProductCreate>;

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  sortBy?: "price" | "title";
  orderBy?: "asc" | "desc";
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedProducts {
  data: Product[];
  pagination: Pagination;
}
