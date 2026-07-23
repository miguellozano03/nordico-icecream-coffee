import { registry } from "./registry";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import "@/modules/menu/docs";

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.1.0",
  info: {
    title: "Nordico Coffee and Ice Cream API",
    description:
      "REST API for the Nordico Coffee and Ice Cream platform. It provides authentication and endpoints for managing categories, products, and other business resources.",
    version: "1.0.0",
    license: {
      name: "MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:8000/api/v1",
      description: "Local development",
    },
  ],

  tags: [
    {
      name: "Authentication",
      description: "Endpoints for user authentication and session management.",
    },
    {
      name: "Categories",
      description: "Manage product categories.",
    },
    {
      name: "Products",
      description: "Manage products and their information.",
    },
  ],
});
