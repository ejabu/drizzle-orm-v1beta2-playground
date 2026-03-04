import db from "@/lib/db/client";

async function main() {
  const articles = await db.query.article.findMany({
    columns: { name: true },
    where: {
      name: {
        eq: "Title 1",
      },
    },
  });
  console.log("Breakpoint ----   articles", articles);
  console.log("Breakpoint ----   articles", articles.at(0)?.name);
}

main();
