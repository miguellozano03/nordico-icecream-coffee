import express from "express";
import path from "path";
import { router } from "./modules/menu/routes";

const app = express();
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello world" });
});
app.use("/api/v1", router);

export default app;
