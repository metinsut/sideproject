import { serverOnly } from "@tanstack/react-start";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables.");
}

const driver = postgres(process.env.DATABASE_URL);

const getDatabase = serverOnly(() => drizzle({ client: driver, schema, casing: "snake_case" }));

export const db = getDatabase();
