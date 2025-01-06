import { db } from "../db/index.ts";
import { usersTable } from "../db/schema.ts";

const newUser = {
  email: "asd",
  username: "asdasd",
  hashedPassword: "asdasdasd",
};

async function createUser() {
  try {
    const result = await db.insert(usersTable).values(newUser);
    console.log("User created successfully:", result);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

createUser();
