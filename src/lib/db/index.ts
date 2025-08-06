import { serverOnly } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!import.meta.env.VITE_DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

const driver = postgres(import.meta.env.VITE_DATABASE_URL);

export const db = serverOnly(() => drizzle({ client: driver, schema, casing: "snake_case" }));
