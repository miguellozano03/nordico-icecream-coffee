import { PrismaClient, Prisma } from "@/generated/prisma/client";
import { Category } from "@/generated/prisma/client";
import {
  CategoryCreate,
  CategoryUpdate,
  ProductCreate,
  ProductUpdate,
} from "./types";

export class CategoryService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getALL(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  }

  public async getOne(id: string): Promise<Category> {
    const category = await this.prisma.category.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    return category;
  }

  public async create(payload: CategoryCreate): Promise<Category> {
    const created = await this.prisma.category.create({
      data: payload,
    });

    return created;
  }

  public async update(payload: CategoryUpdate, id: string): Promise<Category> {
    const updated = await this.prisma.category.update({
      where: { id: id },
      data: payload,
    });

    return updated;
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id: id } });
  }
}

interface GetProductArgs {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  orderBy?: "asc" | "desc";
  sortBy?: "price" | "title";
}

export class ProductService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getALL(options: GetProductArgs = {}) {
    const page = options.page && options.page > 0 ? options.page : 1;
    const limit = Math.min(options.limit ?? 10, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (options.search) {
      where.OR = [
        {
          title: {
            contains: options.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: options.search,
            mode: "insensitive",
          },
        },
      ];
    }

    if (options.categoryId) {
      where.categoryId = options.categoryId;
    }

    const sortBy = options.sortBy ?? "title";
    const orderBy = options.orderBy ?? "desc";

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: orderBy,
        },
        include: { category: true },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  public async getOne(id: string) {
    return await this.prisma.product.findUniqueOrThrow({ where: { id } });
  }

  public async create(payload: ProductCreate) {
    const created = await this.prisma.product.create({ data: payload });
    return created;
  }

  public async update(payload: ProductUpdate, id: string) {
    const updated = await this.prisma.product.update({
      where: { id: id },
      data: payload,
    });
    return updated;
  }

  public async delete(id: string) {
    await this.prisma.product.delete({ where: { id: id } });
  }
}
