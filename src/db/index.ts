import "dotenv/config";
import { drizzle } from "drizzle-orm/connect";
import * as schema from "./schema.ts";

export const db = await drizzle("node-postgres", {
  connection: {
    connectionString: process.env.DB_URL!,
  },
  schema,
});
