import { sql } from "drizzle-orm";
import { db } from "../db/index.ts";

const clearTable = async () => {
  const tableName = process.argv[2];

  if (tableName === undefined) {
    console.error("Error: Missing table name argument.");
    console.log("Usage: npm run clear-table <table_name>");
    process.exit(1);
  }

  try {
    await db.execute(sql`TRUNCATE TABLE ${sql.raw(`"${tableName}"`)}`);
    console.log(`Table ${tableName} cleared successfully`);
  } catch (error) {
    console.error("Error clearing table:", error);
  }
};

clearTable();
