import { pino } from "pino";
import { config } from "./env";

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  transport: !config.IS_PRODUCTION ? { target: "pino-pretty" } : undefined,
});
