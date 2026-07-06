import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@/generated/prisma/client";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        req.log.warn(
          {
            code: err.code,
            model: err.meta?.modelName,
          },
          "Duplicate resource",
        );
        return res.status(409).json({
          message: "The resource already exists.",
        });

      case "P2003":
        req.log.warn(
          {
            code: err.code,
            model: err.meta?.modelName,
          },
          "Resource in use",
        );
        return res.status(409).json({
          message: "Cannot delete because the resource is in use.",
        });

      case "P2025":
        req.log.warn(
          {
            code: err.code,
            model: err.meta?.modelName,
          },
          "Resource not found",
        );
        return res.status(404).json({
          message: "Resource not found",
        });
    }
  }

  const pgCode = err?.code ?? err?.cause?.code ?? err?.originalError?.code;

  switch (pgCode) {
    case "23505": // unique_violation
      req.log.warn(
        {
          code: pgCode,
        },
        "Duplicate resource",
      );
      return res.status(409).json({
        message: "The resource already exists.",
      });

    case "23001": // foreign_key_violation
      req.log.warn(
        {
          code: pgCode,
        },
        "Foreign key violation",
      );
      return res.status(409).json({
        message: "Cannot delete because the resource is in use.",
      });
  }

  req.log.error({ err }, "Unhandled error");

  return res.status(500).json({
    message: "Internal server error.",
  });
}
