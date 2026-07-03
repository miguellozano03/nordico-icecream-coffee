import express from "express";
import path from "path";
import { toNodeHandler } from "better-auth/node";
import { router } from "./modules/menu/routes";
import { auth } from "./lib/auth";

const app = express();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.post("/api/v1/auth/sign-up/email", (req, res) => {
  res.sendStatus(404);
});

app.all("/api/v1/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.use("/api/v1", router);

export default app;
