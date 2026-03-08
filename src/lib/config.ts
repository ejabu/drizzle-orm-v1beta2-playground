import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_TYPE: z.enum(["pglite", "postgres"]).default("pglite"),
  BETTER_AUTH_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  MICROSOFT_CLIENT_ID: z.string().optional().default(''),
  MICROSOFT_CLIENT_SECRET: z.string().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid env");
  console.error(parsed.error.issues);
  process.exit(1);
}

export const config = parsed.data;
