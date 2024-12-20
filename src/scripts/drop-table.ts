import pg from "pg";
import "dotenv/config";

const { Client } = pg;

function showUsage() {
  console.log("Usage: npm run drop-table -- <table_name>");
  process.exit(1);
}

async function dropTable() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT != null ? Number(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await client.connect();

  const tableName = process.argv[2];

  if (tableName === undefined) {
    console.error("Error: Missing table name argument.");
    showUsage(); // Show usage and exit
  }

  try {
    // Run the DROP TABLE command
    await client.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
    console.log(`Table ${tableName} has been dropped (if existed).`);
  } catch (err) {
    console.error("Error dropping table:", err);
  } finally {
    // Close the connection
    await client.end();
  }
}

dropTable().catch(console.error);
