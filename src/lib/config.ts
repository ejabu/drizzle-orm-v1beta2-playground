import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_TYPE: z.enum(["pglite", "postgres"]).default("pglite"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid env");
  console.error(parsed.error.issues);
  process.exit(1);
}

export const config = parsed.data;
