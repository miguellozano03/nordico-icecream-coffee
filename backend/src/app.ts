import express, { type Express } from "express";
import path from "path";
import cors from "cors";
import pinoHttp from "pino-http";
import { toNodeHandler } from "better-auth/node";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { openApiDocument } from "@/docs/openapi";
import { apiReference } from "@scalar/express-api-reference";
import { router } from "./modules/menu/routes";
import { auth as defaultAuth } from "./lib/auth";
import { logger } from "./config/logger";
import { config } from "./config/env";

type CreateAppOptions = {
  auth?: typeof defaultAuth;
  enableDocs?: boolean;
};

export function createApp(options: CreateAppOptions = {}): Express {
  const { auth = defaultAuth, enableDocs = true } = options;

  const app = express();

  app.use(cors({ origin: config.CORS_ORIGIN, credentials: true }));

  app.use(
    pinoHttp({
      logger,
      quietReqLogger: true,
      quietResLogger: true,
      serializers: {
        req: () => undefined,
        res: () => undefined,
      },
      customSuccessMessage(req, res) {
        return `${req.method} ${req.url} ${res.statusCode}`;
      },
    }),
  );

  if (enableDocs) {
    app.use(
      "/api/v1/docs",
      apiReference({
        content: openApiDocument,
        pageTitle: "Nordico API Documentation",
      }),
    );
  }

  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  app.all("/api/v1/auth/{*any}", toNodeHandler(auth));

  app.use(express.json());

  app.use("/api/v1", router);

  app.use(errorHandler);

  return app;
}
