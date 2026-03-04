import "dotenv/config";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";
import { drizzle as pgliteDrizzle } from "drizzle-orm/pglite/driver";

import { config } from "@/lib/config";
import { relations } from "@/lib/db/schema";

const pgDatabase = pgDrizzle({ connection: "postgres://...", relations });
const pgliteDatabase = pgliteDrizzle({ connection: ".pglite", relations });

export const getDb = () => {
  if (config.DATABASE_TYPE === "postgres") {
    return pgDatabase;
  } else {
    return pgliteDatabase;
  }
};

const db = getDb();

export default db;
