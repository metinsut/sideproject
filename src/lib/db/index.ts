import { createIsomorphicFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

function createDb() {
  // Use runtime environment variables (Bun.env or process.env)
  // import.meta.env is build-time only and won't work in Docker runtime
  const url = Bun.env.VITE_DATABASE_URL || import.meta.env.VITE_DATABASE_URL;

  if (!url) {
    throw new Error("VITE_DATABASE_URL is missing at runtime");
  }

  const client = postgres(url);

  return drizzle(client, {
    schema,
    casing: "snake_case",
  });
}

export const db = createIsomorphicFn().server(() => {
  return createDb();
});
