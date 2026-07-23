export interface Category {
  id: string;
  name: string;
}

export interface CategoryCreate {
  name: string;
}

export type CategoryUpdate = Partial<CategoryCreate>;

export interface Product {
  id: string;
  categoryId: string;
  category: Category;
  image?: string;
  title: string;
  description: string;
  price: number;
}

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
