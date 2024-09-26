import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client, db } from "./db.js";

await migrate(db, { migrationsFolder: "./src/drizzle/migrations" });

await client.end();
