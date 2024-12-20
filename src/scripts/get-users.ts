import { db } from "../db/index.ts";
import { usersTable } from "../db/schema.ts";

async function getUsers() {
  const users = await db.select().from(usersTable);
  console.log(users);
}

getUsers();
