import { defineRelations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp(),
  deletedAt: timestamp(),
};

export const article = pgTable("article", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  ...timestamps,
});

const schema = { article };

export const relations = defineRelations(schema, () => ({}));
