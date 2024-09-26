import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

export const client = new pg.Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: "musicator-db",
});

await client.connect();

export const db = drizzle(client);
