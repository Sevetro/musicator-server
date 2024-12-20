import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// Everything here should be exported to be accessible by database

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 60 }).notNull().unique(),
  email: varchar("email", { length: 60 }).notNull().unique(),
  password: varchar("password", { length: 60 }).notNull(),
});

export const pendingUsersTable = pgTable("pendingUsers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 60 }).notNull().unique(),
  email: varchar("email", { length: 60 }).notNull().unique(),
  password: varchar("password", { length: 60 }).notNull(),
  confirmationToken: varchar("confirmationToken", { length: 100 }),
  tokenExpiresAt: timestamp("tokenExpiresAt").notNull(),
});
