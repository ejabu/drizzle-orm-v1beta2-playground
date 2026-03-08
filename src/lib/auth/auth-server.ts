import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { config } from "@/lib/config";
import db from "@/lib/db/client";
import { schema } from "@/lib/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema: schema }),
  baseURL: config.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true },
  socialProviders: {
    microsoft: {
      clientId: config.MICROSOFT_CLIENT_ID,
      clientSecret: config.MICROSOFT_CLIENT_SECRET,
      tenantId: "common",
      requireSelectAccount: true,
      includeGrantedScopes: true,
    },
  },
});
