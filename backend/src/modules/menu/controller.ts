import { Request, Response, NextFunction } from "express";
import { ImageService } from "@/services/image.service";
import { CategoryService, ProductService } from "./service";
import { ProductUpdate, CategoryUpdate, productQuerySchema } from "./types";

type ProductQuery = z.infer<typeof productQuerySchema>;

export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.service.getALL();

      res.json(categories);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.service.create(req.body);

      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request<{ id: string }, {}, CategoryUpdate>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const product = await this.service.update(req.body, req.params.id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await this.service.delete(req.params.id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}

export class ProductController {
  constructor(
    private readonly service: ProductService,
    private readonly imageService: ImageService,
  ) {}

  public getAll = async (
    req: Request<{}, {}, {}, ProductQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const products = await this.service.getALL({
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
        search: req.query.search as string,
        categoryId: req.query.categoryId as string,
        sortBy: req.query.sortBy as "price" | "title",
        orderBy: req.query.orderBy as "asc" | "desc",
      });

      res.json(products);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const image = req.file ? await this.imageService.upload(req.file) : null;

      const product = await this.service.create({
        ...req.body,
        price: Number(req.body.price),
        image,
      });

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request<{ id: string }, {}, ProductUpdate>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const product = await this.service.update(req.body, req.params.id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await this.service.delete(req.params.id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
