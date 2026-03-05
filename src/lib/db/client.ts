import "dotenv/config";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as pgliteDrizzle } from "drizzle-orm/pglite/driver";

import { config } from "@/lib/config";
import { relations } from "@/lib/db/schema";

const pgDatabase = pgDrizzle({ connection: config.DATABASE_URL, relations });
const pgliteDatabase = pgliteDrizzle({ connection: config.DATABASE_URL, relations });

export const getDb = () => {
  if (config.DATABASE_TYPE === "postgres") {
    return pgDatabase;
  } else {
    return pgliteDatabase;
  }
};

const db = getDb();

export default db;
