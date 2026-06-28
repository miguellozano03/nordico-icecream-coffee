// Users

export interface UserCreate {
  email: string;
  name: string;
  lastname: string;
}

export interface UserUpdate {
  email?: string;
  name?: string;
  lastname?: string;
}

// Category

export interface CategoryCreate {
  name: string;
}

export interface CategoryUpdate {
  name?: string;
}

// Product

export interface ProductCreate {
  categoryId: string;
  image?: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductUpdate {
  categoryId?: string;
  image?: string | null;
  title?: string;
  description?: string;
  price?: number;
}
