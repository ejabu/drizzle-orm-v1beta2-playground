import { sql } from "drizzle-orm/sql";

import db from "@/lib/db/client";

async function main() {
  await db.execute(sql`DROP SCHEMA IF EXISTS public CASCADE;`);
  await db.execute(sql`CREATE SCHEMA public;`);
}

main();
