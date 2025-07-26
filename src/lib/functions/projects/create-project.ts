import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getUser } from "@/lib/auth/functions/getUser";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";

export const createProjectSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export const createProject = createServerFn({
  method: "POST",
  response: "data",
})
  .validator((payload) => createProjectSchema.parse(payload))
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }
    const [newProject] = await db
      .insert(projects)
      .values({
        ...data,
        creatorId: user.id,
      })
      .returning();

    return newProject;
  });
