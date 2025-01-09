import { db } from "../db/index.ts";

async function dropTable() {
  const tableName = process.argv[2];

  if (tableName === undefined) {
    console.error("Error: Missing table name argument.");
    console.log("Usage: npm run drop-table <table_name>");
    process.exit(1);
  }

  try {
    await db.execute(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
    console.log(`Table ${tableName} has been dropped (if existed).`);
  } catch (err) {
    console.error("Error dropping table:", err);
  }
}

dropTable();
