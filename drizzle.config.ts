import { defineConfig } from "drizzle-kit";

import { DB_URL } from "./src/constants/envs.ts";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
  verbose: true,
  strict: true,
});
