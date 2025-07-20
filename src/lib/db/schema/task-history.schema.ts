import { integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { tasks } from "./task.schema";

export const historyActionEnum = pgEnum("history_action_type", [
  "FIELD_UPDATE",
  "COMMENT_ADDED",
  "COMMENT_EDITED",
  "COMMENT_DELETED",
]);

export const taskHistory = pgTable("task_history", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  actionType: historyActionEnum("action_type").notNull(),
  fieldChanged: text("field_changed"),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  contextId: integer("context_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
