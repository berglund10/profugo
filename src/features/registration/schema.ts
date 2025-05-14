import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const registrationTable = pgTable("registration", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar(),
    personalNumber: varchar(),
    city: varchar()
  });