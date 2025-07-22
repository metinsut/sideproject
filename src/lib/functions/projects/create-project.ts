import { createServerFn } from "@tanstack/react-start";
import { getUser } from "@/lib/auth/functions/getUser";
import { db } from "@/lib/db";
import { insertProjectSchema, projects } from "@/lib/db/schema";

const createProjectPayloadSchema = insertProjectSchema.pick({
  name: true,
  description: true,
});

export const createProject = createServerFn({
  method: "POST",
  response: "data",
})
  .validator((payload) => createProjectPayloadSchema.parse(payload))
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
