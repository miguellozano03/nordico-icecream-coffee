import { Router } from "express";
import { prisma } from "../../config/prisma";
import { ImageService } from "../../services/image.service";
import { upload } from "../../middlewares/upload.middleware";
import { CategoryService, ProductService } from "./service";
import { CategoryController, ProductController } from "./controller";

export const router = Router();
const categoryController = new CategoryController(new CategoryService(prisma));
const productController = new ProductController(
  new ProductService(prisma),
  new ImageService(),
);

// Category controller

router.get("/categories", categoryController.getAll);
router.post("/categories", categoryController.create);
router.patch("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.delete);

// Product controller

router.get("/products", productController.getAll);
router.post("/products", upload.single("image"), productController.create);
router.patch("/products/:id", productController.update);
router.patch("/products/:id", productController.delete);
