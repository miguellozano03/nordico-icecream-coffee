import { createApp } from "./app.js";
import { config } from "./config/env.js";
import { logger } from "./config/logger.js";

const app = createApp();

app.listen(config.PORT, () => {
  logger.info(`Running app on http://localhost:${config.PORT}`);
});

process.on("uncaughtException", (err) => {
  logger.fatal(err, "Uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.fatal({ err: reason }, "Unhandled rejection");
  process.exit(1);
});
