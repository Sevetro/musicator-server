import { drizzle } from "drizzle-orm/connect";
import * as schema from "./schema.ts";
import { DB_URL } from "../constants/envs.ts";

export const db = await drizzle("node-postgres", {
  connection: {
    connectionString: DB_URL!,
  },
  schema,
});
