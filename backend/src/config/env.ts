import "dotenv/config";
import { logger } from "./logger";

function requireEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;

  if (!value) {
    console.error(`FATAL: Missing required environment variable: ${name}`);
    throw new Error(`${name} is required`);
  }

  return value;
}

class Config {
  readonly PORT = Number(requireEnv("PORT", "8000")) || 8000;

  readonly DATABASE_URL = requireEnv("DATABASE_URL");

  readonly BETTER_AUTH_URL = requireEnv("BETTER_AUTH_URL");

  readonly NODE_ENV = requireEnv("NODE_ENV", "development");

  readonly IS_PRODUCTION = this.NODE_ENV === "production";

  readonly LOG_LEVEL = requireEnv("LOG_LEVEL", "info");
}

export const config = new Config();
