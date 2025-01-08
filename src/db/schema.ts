import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import {
  maxEmailLength,
  maxUsernameLength,
  maxPasswordLength,
} from "../shared/validation.ts";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: maxUsernameLength })
    .notNull()
    .unique(),
  email: varchar("email", { length: maxEmailLength }).notNull().unique(),
  hashedPassword: varchar("hashedPassword", {
    length: maxPasswordLength,
  }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const pendingUsersTable = pgTable("pendingUsers", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: maxUsernameLength })
    .notNull()
    .unique(),
  email: varchar("email", { length: maxEmailLength }).notNull().unique(),
  hashedPassword: varchar("hashedPassword", {
    length: maxPasswordLength,
  }).notNull(),
  confirmationToken: varchar("confirmationToken"),
  tokenExpiresAt: timestamp("tokenExpiresAt").notNull(),
});
