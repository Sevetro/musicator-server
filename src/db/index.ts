import "dotenv/config";
import { drizzle } from "drizzle-orm/connect";

export const db = await drizzle("node-postgres", {
  connection: {
    connectionString: process.env.DB_URL!,
  },
});
