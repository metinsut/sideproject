import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";

const getTaskByIdSchema = z.object({
  id: z.number(),
});

export type GetTaskByIdSchema = z.infer<typeof getTaskByIdSchema>;

export async function getTaskById({ data }: { data: GetTaskByIdSchema }) {
  try {
    const validatedData = getTaskByIdSchema.parse(data);

    const task = await db()?.select().from(tasks).where(eq(tasks.id, validatedData.id)).limit(1);

    if (!task?.[0]) {
      throw new Error("Task not found");
    }

    return task?.[0];
  } catch (error) {
    console.error("Get task by ID error:", error);
    throw error;
  }
}
