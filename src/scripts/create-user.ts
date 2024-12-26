import { db } from "../db/index.ts";
import { usersTable } from "../db/schema.ts";

async function createUser() {
  try {
    const result = await db
      .insert(usersTable)
      .values({ email: "asd", name: "asdasd", hashedPassword: "asdasdasd" });
    console.log("User created successfully:", result);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

createUser();
