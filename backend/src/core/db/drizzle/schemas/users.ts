import { pgTable, varchar, unique, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    username: varchar({ length: 255 }).notNull(),
    password: varchar().notNull(),
  },
  (table) => [unique("users_username_unique").on(table.username)],
);
