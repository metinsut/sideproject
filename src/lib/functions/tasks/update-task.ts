import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getUser } from "@/lib/auth/functions/getUser";
import { db } from "@/lib/db";
import { taskPriorityEnum, taskStatusEnum, tasks } from "@/lib/db/schema";

const updateTaskSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters")
    .optional(),
  description: z.string().optional(),
  status: z.enum(taskStatusEnum.enumValues).optional(),
  priority: z.enum(taskPriorityEnum.enumValues).optional(),
  assigneeId: z.string().optional(),
  parentTaskId: z.number().optional(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;

export const updateTask = createServerFn({
  method: "POST",
  response: "data",
})
  .validator((payload) => updateTaskSchema.parse(payload))
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    const { id, ...updateData } = data;

    const updatedTask = await db()
      .update(tasks)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(tasks.id, id))
      .returning();

    if (!updatedTask[0]) {
      throw new Error("Task not found");
    }

    return updatedTask[0];
  });
