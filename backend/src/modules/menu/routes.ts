import { Router } from "express";
import { prisma } from "@/config/prisma";
import { ImageService } from "@/services/image.service";
import { validate } from "@/middlewares/validate";
import { upload } from "@/middlewares/upload.middleware";
import { requireAuth } from "@/middlewares/auth.middleware";
import { CategoryService, ProductService } from "./service";
import { CategoryController, ProductController } from "./controller";
import {
  idParamSchema,
  categoryCreateSchema,
  productQuerySchema,
  categoryUpdateSchema,
  productCreateSchema,
  productUpdateSchema,
} from "./types";

export const router = Router();
const categoryController = new CategoryController(new CategoryService(prisma));
const productController = new ProductController(
  new ProductService(prisma),
  new ImageService(),
);

// Category controller

router.get("/categories", categoryController.getAll);
router.post(
  "/categories",
  requireAuth,
  validate({ body: categoryCreateSchema }),
  categoryController.create,
);
router.patch(
  "/categories/:id",
  requireAuth,
  validate({ params: idParamSchema, body: categoryUpdateSchema }),
  categoryController.update,
);
router.delete(
  "/categories/:id",
  requireAuth,
  validate({ params: idParamSchema }),
  categoryController.delete,
);

// Product controller

router.get(
  "/products",
  validate({ query: productQuerySchema }),
  productController.getAll,
);
router.post(
  "/products",
  requireAuth,
  upload.single("image"),
  validate({ body: productCreateSchema }),
  productController.create,
);
router.patch(
  "/products/:id",
  requireAuth,
  upload.single("image"),
  validate({ params: idParamSchema, body: productUpdateSchema }),
  productController.update,
);
router.delete(
  "/products/:id",
  requireAuth,
  validate({ params: idParamSchema }),
  productController.delete,
);
