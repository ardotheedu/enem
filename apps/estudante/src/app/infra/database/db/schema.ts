import { uuid, pgTable, varchar, date } from "drizzle-orm/pg-core";

export const estudantes = pgTable("estudantes", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  birth_date: date().notNull(),
});
