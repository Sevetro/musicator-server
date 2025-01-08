import { db } from "../db/index.ts";
import { pendingUsersTable } from "../db/schema.ts";

async function getPendingUsers() {
  const pendingUsers = await db.select().from(pendingUsersTable);
  console.log(pendingUsers);
}

getPendingUsers();
