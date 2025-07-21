import { createServerFn } from "@tanstack/react-start";
import { getUser } from "@/lib/auth/functions/getUser";
import { db } from "@/lib/db";
import { insertProjectSchema, projects } from "@/lib/db/schema";

export const createProject = createServerFn({
  method: "POST",
  response: "data",
}).handler(async ({ data }) => {
  if (!data) {
    throw new Error("Data is required");
  }
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }

  const validatedData = insertProjectSchema.parse(data);

  const [newProject] = await db
    .insert(projects)
    .values({
      ...validatedData,
      creatorId: user.id,
    })
    .returning();

  return newProject;
});
