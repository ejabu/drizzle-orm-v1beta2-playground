import { eq } from "drizzle-orm";

import db from "@/lib/db/client";
import { article } from "@/lib/db/schema";

async function main() {
  // 1. Read operation
  const articles = await db.query.article.findMany({
    columns: { name: true },
    where: {
      name: {
        eq: "Title 1",
      },
    },
  });

  console.log("Breakpoint ----   first item", articles.at(0)?.name);

  // 2. Update operation
  await db
    .update(article)
    .set({ name: "Title 2c" })
    .where(eq(article.name, "Title 3"));

  const updatedItems = await db.query.article.findMany({
    columns: {
      name: true,
      updatedAt: true,
    },
  });
  console.log("Breakpoint ----   updatedItems", updatedItems);
}

main();
