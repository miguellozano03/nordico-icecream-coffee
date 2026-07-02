import 'dotenv/config'

class Config {

  readonly PORT = Number(process.env.PORT) || 8000;

  readonly DATABASE_URL = process.env.DATABASE_URL!;

  readonly BETTER_AUTH_URL = process.env.BETTER_AUTH_URL!;

  constructor() {
    if (!this.DATABASE_URL) {
      throw new Error("DATABASE_URL is required");
    }
  }
}

export const config = new Config();