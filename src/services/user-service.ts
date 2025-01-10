import { eq } from "drizzle-orm";

import { db } from "../db/index.ts";
import { pendingUsersTable, usersTable } from "../db/schema.ts";
import {
  emailOccupiedErrorCode,
  usernameOccupiedErrorCode,
} from "../shared/error-codes.ts";
import { hashPassword } from "../utils/hash-password.ts";

export const checkIfUserExists = async (
  username: string,
  email: string
): Promise<string[]> => {
  const errors: string[] = [];

  const [
    usernameResult,
    emailResult,
    pendingUsernameResult,
    pendingEmailResult,
  ] = await Promise.all([
    db.select().from(usersTable).where(eq(usersTable.username, username)),
    db.select().from(usersTable).where(eq(usersTable.email, email)),
    db
      .select()
      .from(pendingUsersTable)
      .where(eq(pendingUsersTable.username, username)),
    db
      .select()
      .from(pendingUsersTable)
      .where(eq(pendingUsersTable.email, email)),
  ]);

  if (usernameResult.length > 0 || pendingUsernameResult.length > 0) {
    errors.push(usernameOccupiedErrorCode);
  }
  if (emailResult.length > 0 || pendingEmailResult.length > 0) {
    errors.push(emailOccupiedErrorCode);
  }

  return errors;
};

export const createPendingUser = async (
  username: string,
  email: string,
  password: string,
  confirmationToken: string
) => {
  const hashedPassword = await hashPassword(password);
  const tokenExpiresAt = new Date(Date.now() + 86400 * 1000);

  await db.insert(pendingUsersTable).values({
    username,
    email,
    hashedPassword,
    confirmationToken,
    tokenExpiresAt,
  });
};
