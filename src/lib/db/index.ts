import { createIsomorphicFn } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

function createDb() {
  const url = import.meta.env.VITE_DATABASE_URL || Bun.env.VITE_DATABASE_URL;

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
