import "dotenv/config";
import { DrizzleConfig } from "drizzle-orm";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as pgliteDrizzle } from "drizzle-orm/pglite/driver";

import { config } from "@/lib/config";
import { relations } from "@/lib/db/schema";

type DbConfig = DrizzleConfig & {
  connection: string;
};

const dbConfig = {
  connection: config.DATABASE_URL,
  relations,
  casing: "snake_case",
} satisfies DbConfig;

export const getDb = () => {
  if (config.DATABASE_TYPE === "postgres") {
    return pgDrizzle(dbConfig);
  } else {
    return pgliteDrizzle(dbConfig);
  }
};

const db = getDb();

export default db;
