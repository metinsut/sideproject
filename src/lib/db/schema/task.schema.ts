import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import { projects } from "./project.schema";

export const taskStatusEnum = pgEnum("status", [
  "created",
  "assigned",
  "in_progress",
  "waiting_for_review",
  "revision_requested",
  "completed",
  "approved",
  "rejected",
  "archived",
  "cancelled",
  "scheduled",
  "on_hold",
  "blocked",
  "needs_info",
  "failed",
  "reopened",
]);

export const taskPriorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  status: taskStatusEnum("status").notNull().default("created"),
  priority: taskPriorityEnum("priority").default("medium"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  assigneeId: text("assignee_id").references(() => user.id, {
    onDelete: "set null",
  }),
  creatorId: text("creator_id")
    .notNull()
    .references(() => user.id),
  parentTaskId: integer("parent_task_id"),
});

export const tasksRelations = relations(tasks, ({ one }) => ({
  parentTask: one(tasks, {
    fields: [tasks.parentTaskId],
    references: [tasks.id],
  }),
}));
