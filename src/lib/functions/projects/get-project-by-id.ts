import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getUser } from "@/lib/auth/functions/getUser";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";

export const getProjectById = createServerFn({
  method: "GET",
  response: "data",
})
  .validator((payload) => z.object({ projectId: z.number() }).parse(payload))
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, data.projectId),
    });
    return project;
  });
