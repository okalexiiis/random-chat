import { pgTable, integer, varchar, unique, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	username: varchar({ length: 255 }).notNull(),
  password: varchar().notNull(),
}, (table) => [
	unique("users_username_unique").on(table.username)
]);
