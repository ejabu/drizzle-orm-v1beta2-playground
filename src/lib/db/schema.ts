import { defineRelations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp({ withTimezone: true }),
};

export const article = pgTable("article", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  ...timestamps,
});

const schema = { article };

export const relations = defineRelations(schema, () => ({}));
