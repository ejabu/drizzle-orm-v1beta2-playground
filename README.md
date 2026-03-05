# Drizzle ORM v1 beta 2 Playground (Type-Safe DB)

This repo is a small **Next.js App Router** project meant to showcase **Drizzle ORM v1 beta 2** capabilities—especially **end-to-end type-safety**, clean schema definitions, and typed queries.

If you want the official release details, see the Drizzle docs: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1beta2

---

## TLDR

Use commands below for quick run. See details in [Development Guide](#development-guide)

```sh
pnpm install
pnpm db:restart
pnpm tsx src/scripts/playground.ts
```

## What this repo demonstrates

- **Strongly typed schema** in `src/lib/db/schema.ts`
- **Typed DB client** in `src/lib/db/client.ts`
- Type-safe queries that infer:
  - column types
  - select/insert shapes
  - relations (if you add them)
  - query results
- Simple **reset + seed** scripts to quickly iterate

---

## Project structure

```sh
src
├── lib
│   ├── config.ts
│   └── db
│       ├── client.ts
│       └── schema.ts
└── scripts
    ├── db
    │   ├── reset.ts
    │   └── seed.ts
    └── playground.ts
```

## Development Guide

Follow the steps below to set up the project locally and explore the type-safe database features.

### 1. Create your environment file

Copy the example environment configuration:

```sh
cp .env.example .env
```

Then update the required variables (such as DATABASE_URL) if needed.

### 2. Prepare the database

Initialize the database schema and seed data:

```sh
pnpm db:restart
```
This command will:

- Reset the database
- Push the latest schema
- Seed the database with sample data

### 3. Inspect the database

Open the Drizzle Studio UI to verify the tables and data:

```sh
pnpm db:studio
```

Then open:

https://local.drizzle.studio

You should see the generated tables and seeded records.

### 4. Run the playground script

Execute the example script to explore typed queries and experiment with the database:

```sh
pnpm tsx src/scripts/playground.ts
```

This script demonstrates how Drizzle ORM v1 beta 2 provides strong TypeScript typing for queries, inserts, and schema interactions.
