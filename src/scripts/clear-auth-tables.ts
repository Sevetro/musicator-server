import { sql } from "drizzle-orm";
import { db } from "../db/index.ts";

const clearTable = async () => {
  try {
    await Promise.all([
      db.execute(sql`TRUNCATE TABLE "users"`),
      db.execute(sql`TRUNCATE TABLE "pendingUsers"`),
    ]);

    console.log(`Auth tables cleared successfully`);
  } catch (error) {
    console.error("Error clearing tables: ", error);
  }
};

clearTable();
