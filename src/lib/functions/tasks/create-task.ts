import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/lib/db";
import { taskPriorityEnum, tasks } from "@/lib/db/schema";
import { getUser } from "@/lib/functions/auth/getUser";

const createTaskSchema = z.object({
  projectId: z.number(),
  title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
  description: z.string().optional(),
  priority: z.enum(taskPriorityEnum.enumValues).optional(),
  assigneeId: z.string().optional(),
  parentTaskId: z.number().optional(),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const createTask = createServerFn({
  method: "POST",
})
  .inputValidator((payload) => createTaskSchema.parse(payload))
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    const newTask = await db()
      ?.insert(tasks)
      .values({
        ...data,
        creatorId: user.id,
        status: "created",
      })
      .returning();

    return newTask?.[0];
  });
