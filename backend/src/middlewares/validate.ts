import { Request, Response, NextFunction, RequestHandler } from "express";
import { z, ZodError } from "zod";

interface Schemas<
  TBody extends z.ZodTypeAny = z.ZodTypeAny,
  TParams extends z.ZodTypeAny = z.ZodTypeAny,
  TQuery extends z.ZodTypeAny = z.ZodTypeAny,
> {
  body?: TBody;
  params?: TParams;
  query?: TQuery;
}

export function validate<
  TBody extends z.ZodTypeAny = z.ZodTypeAny,
  TParams extends z.ZodTypeAny = z.ZodTypeAny,
  TQuery extends z.ZodTypeAny = z.ZodTypeAny,
>(
  schemas: Schemas<TBody, TParams, TQuery>,
): RequestHandler<z.infer<TParams>, unknown, z.infer<TBody>, z.infer<TQuery>> {
  return (
    req: Request<z.infer<TParams>, unknown, z.infer<TBody>, z.infer<TQuery>>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          message: "Error de validación",
          errors: err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
        return;
      }

      next(err);
    }
  };
}
