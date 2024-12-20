import { db } from "../db/index.ts";
import { usersTable } from "../db/schema.ts";

async function createUser() {
  try {
    const result = await db
      .insert(usersTable)
      .values({ email: "dupa@gmail.com", name: "Ukaszek", password: "HASUO" });
    console.log("User created successfully:", result);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

createUser();
