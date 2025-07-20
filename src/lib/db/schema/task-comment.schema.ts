import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { tasks } from "./task.schema";

export const taskComments = pgTable("task_comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  taskId: integer("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  content: text("content").notNull(),
  editedAt: timestamp("edited_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
