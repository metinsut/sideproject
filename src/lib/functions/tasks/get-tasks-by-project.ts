import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { getUser } from "@/lib/functions/auth/getUser";

export const getTasksByProject = createServerFn({
  method: "GET",
})
  .inputValidator((payload) => z.object({ projectId: z.number() }).parse(payload))
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    const projectTasks = await db()?.query.tasks.findMany({
      where: eq(tasks.projectId, data.projectId),
      orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
    });

    return projectTasks;
  });
