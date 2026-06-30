import * as z from "zod";

// params

export const idParamSchema = z.object({
  id: z.uuid(),
});

// Users

export const userCreateSchema = z.object({
  email: z.email(),
  name: z.string(),
  lastname: z.string(),
});

export const userUpdateSchema = z.object({
  email: z.email().optional(),
  name: z.string().optional(),
  lastname: z.string().optional(),
});

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

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

export const productCreatePayloadSchema = productCreateSchema.extend({
  image: z.string().nullable().optional(),
});

export const productUpdateSchema = productCreateSchema.partial().extend({
  image: z.string().nullable().optional(),
});

export type ProductCreate = z.infer<typeof productCreatePayloadSchema>;
export type ProductUpdate = z.infer<typeof productUpdateSchema>;
