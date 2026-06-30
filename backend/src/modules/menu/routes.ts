import { Router } from "express";
import { prisma } from "../../config/prisma";
import { ImageService } from "../../services/image.service";
import { validate } from "../../middlewares/validate";
import { upload } from "../../middlewares/upload.middleware";
import { CategoryService, ProductService } from "./service";
import { CategoryController, ProductController } from "./controller";
import {
  idParamSchema,
  categoryCreateSchema,
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
  validate({ body: categoryCreateSchema }),
  categoryController.create,
);
router.patch(
  "/categories/:id",
  validate({ params: idParamSchema, body: categoryUpdateSchema }),
  categoryController.update,
);
router.delete(
  "/categories/:id",
  validate({ params: idParamSchema }),
  categoryController.delete,
);

// Product controller

router.get("/products", productController.getAll);
router.post(
  "/products",
  validate({ body: productCreateSchema }),
  upload.single("image"),
  productController.create,
);
router.patch(
  "/products/:id",
  validate({ params: idParamSchema, body: productUpdateSchema }),
  productController.update,
);
router.patch(
  "/products/:id",
  validate({ params: idParamSchema }),
  productController.delete,
);
