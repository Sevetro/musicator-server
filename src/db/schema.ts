import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// Everything here should be exported to be accessible by database

export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 })
    .notNull()
    .$default(() => "Ukaszek"),
});
