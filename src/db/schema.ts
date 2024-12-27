import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import {
  maxEmailLength,
  maxNameLength,
  maxPasswordLength,
} from "../shared/validation.ts";

// Everything here should be exported to be accessible by database

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: maxNameLength }).notNull().unique(),
  email: varchar("email", { length: maxEmailLength }).notNull().unique(),
  hashedPassword: varchar("hashedPassword", {
    length: maxPasswordLength,
  }).notNull(),
});

export const pendingUsersTable = pgTable("pendingUsers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: maxNameLength }).notNull().unique(),
  email: varchar("email", { length: maxEmailLength }).notNull().unique(),
  hashedPassword: varchar("hashedPassword", {
    length: maxPasswordLength,
  }).notNull(),
  confirmationToken: varchar("confirmationToken"),
  tokenExpiresAt: timestamp("tokenExpiresAt").notNull(),
});
