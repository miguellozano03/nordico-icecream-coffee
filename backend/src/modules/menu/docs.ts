import { z } from "zod";
import { registry } from "@/docs/registry";
import {
  signUpSchema,
  signInSchema,
  revokeSessionSchema,
  categoryCreateSchema,
  categoryUpdateSchema,
  idParamSchema,
  productQuerySchema,
  productCreateSchema,
  productUpdateSchema,
} from "./types";

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

const categorySchema = z.object({
  id: z.string().uuid().describe("Unique category identifier"),
  name: z.string().min(3).describe("Category name"),
});

const productSchema = z.object({
  id: z.string().uuid().describe("Unique product identifier"),
  categoryId: z.string().describe("Associated category identifier"),
  title: z.string().describe("Product title"),
  description: z.string().describe("Product description"),
  price: z.number().describe("Product price"),
  image: z.string().nullable().optional().describe("Product image URL when available"),
  category: categorySchema.optional().describe("Associated category details"),
});

const paginationSchema = z.object({
  total: z.number().int().describe("Total number of matching items"),
  page: z.number().int().describe("Current page number"),
  limit: z.number().int().describe("Items per page"),
  totalPages: z.number().int().describe("Total number of pages"),
});

const productListResponseSchema = z.object({
  data: z.array(productSchema).describe("List of products for the current page"),
  pagination: paginationSchema,
});

const errorSchema = z.object({
  error: z.string().describe("Error message"),
});

registry.registerPath({
  method: "post",
  path: "/auth/sign-up/email",
  tags: ["Authentication"],
  summary: "Create an account with email and password",
  description: "Registers a new user and returns a session result from Better Auth.",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: signUpSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Account created successfully.",
    },
    400: {
      description: "Request payload is missing or invalid.",
    },
    409: {
      description: "A user with the same email already exists.",
    },
    429: {
      description: "Too many requests. Please try again later.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "post",
  tags: ["Authentication"],
  path: "/auth/sign-in/email",
  summary: "Sign in with email and password",
  description: "Authenticates a user and returns an auth session response.",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: signInSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Authentication succeeded.",
    },
    400: {
      description: "Request payload is missing or invalid.",
    },
    429: {
      description: "Too many requests. Please try again later.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/auth/revoke-session",
  tags: ["Authentication"],
  summary: "Revoke a session",
  description: "Invalidates an existing session token.",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: revokeSessionSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Session revoked successfully.",
    },
    400: {
      description: "Request payload is missing or invalid.",
    },
    401: {
      description: "Unauthorized. Missing or invalid authentication.",
    },
    403: {
      description: "Forbidden.",
    },
    404: {
      description: "Resource not found.",
    },
    429: {
      description: "Too many requests. Please try again later.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/categories",
  tags: ["Categories"],
  summary: "List categories",
  description: "Returns all available menu categories sorted by name.",
  responses: {
    200: {
      description: "Categories retrieved successfully.",
      content: {
        "application/json": {
          schema: z.array(categorySchema),
        },
      },
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/categories",
  tags: ["Categories"],
  summary: "Create category",
  description: "Creates a new product category.",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: categoryCreateSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Category created successfully.",
      content: {
        "application/json": {
          schema: categorySchema,
        },
      },
    },
    400: {
      description: "Request payload is missing or invalid.",
    },
    401: {
      description: "Unauthorized.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "patch",
  path: "/categories/{id}",
  tags: ["Categories"],
  summary: "Update category",
  description: "Updates an existing category by its identifier.",
  security: [{ bearerAuth: [] }],
  request: {
    params: idParamSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: categoryUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Category updated successfully.",
      content: {
        "application/json": {
          schema: categorySchema,
        },
      },
    },
    400: {
      description: "Request payload is missing or invalid.",
    },
    401: {
      description: "Unauthorized.",
    },
    404: {
      description: "Category not found.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/categories/{id}",
  tags: ["Categories"],
  summary: "Delete category",
  description: "Deletes a category by its identifier.",
  security: [{ bearerAuth: [] }],
  request: {
    params: idParamSchema,
  },
  responses: {
    204: {
      description: "Category deleted successfully.",
    },
    401: {
      description: "Unauthorized.",
    },
    404: {
      description: "Category not found.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/products",
  tags: ["Products"],
  summary: "List products",
  description: "Returns products with optional filtering, search, and pagination.",
  request: {
    query: productQuerySchema,
  },
  responses: {
    200: {
      description: "Products retrieved successfully.",
      content: {
        "application/json": {
          schema: productListResponseSchema,
        },
      },
    },
    400: {
      description: "Request query parameters are invalid.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/products",
  tags: ["Products"],
  summary: "Create product",
  description: "Creates a new product and optionally uploads an image.",
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: productCreateSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Product created successfully.",
      content: {
        "application/json": {
          schema: productSchema,
        },
      },
    },
    400: {
      description: "Request payload is missing or invalid.",
    },
    401: {
      description: "Unauthorized.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "patch",
  path: "/products/{id}",
  tags: ["Products"],
  summary: "Update product",
  description: "Updates an existing product by its identifier.",
  security: [{ bearerAuth: [] }],
  request: {
    params: idParamSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: productUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Product updated successfully.",
      content: {
        "application/json": {
          schema: productSchema,
        },
      },
    },
    400: {
      description: "Request payload is missing or invalid.",
    },
    401: {
      description: "Unauthorized.",
    },
    404: {
      description: "Product not found.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/products/{id}",
  tags: ["Products"],
  summary: "Delete product",
  description: "Deletes a product by its identifier.",
  security: [{ bearerAuth: [] }],
  request: {
    params: idParamSchema,
  },
  responses: {
    204: {
      description: "Product deleted successfully.",
    },
    401: {
      description: "Unauthorized.",
    },
    404: {
      description: "Product not found.",
    },
    500: {
      description: "Internal server error.",
    },
  },
});
