import { betterAuth } from "better-auth";
import { openAPI, bearer } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../config/prisma";
import { config } from "../config/env";

export const auth = betterAuth({
  baseURL: config.BETTER_AUTH_URL,
  basePath: "/api/v1/auth",
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:3001",
  ],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [openAPI(), bearer()],
});
