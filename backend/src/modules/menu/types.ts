import * as z from "zod";

// params

export const idParamSchema = z.object({
  id: z.uuid(),
});

// Users

export const signUpSchema = z.object({
  email: z.email(),
  name: z.string(),
  password: z.string(),
  callbackURL: z.url().optional(),
  image: z.url().optional(),
  rememberMe: z.boolean().optional(),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
  callbackURL: z.string(),
  rememberMe: z.boolean(),
});

export const revokeSessionSchema = z.object({
  token: z.string(),
});

// Category

export const categoryCreateSchema = z.object({
  name: z.string().min(3),
});

export const categoryUpdateSchema = z.object({
  name: z.string().min(3).optional(),
});

export type CategoryCreate = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdate = z.infer<typeof categoryUpdateSchema>;

// Product

export const productCreateSchema = z.object({
  categoryId: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.coerce.number().positive(),
});

export const productQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  categoryId: z.string().optional(),
  sortBy: z.enum(["price", "title"]).optional(),
  orderBy: z.enum(["asc", "desc"]).optional(),
});

export const productCreatePayloadSchema = productCreateSchema.extend({
  image: z.string().nullable().optional(),
});

export const productUpdateSchema = productCreateSchema.partial().extend({
  image: z.string().nullable().optional(),
});

export type ProductCreate = z.infer<typeof productCreatePayloadSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;