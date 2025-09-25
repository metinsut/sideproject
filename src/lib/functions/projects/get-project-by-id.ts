import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { getUser } from "@/lib/functions/auth/getUser";

export const getProjectById = createServerFn({
  method: "GET",
})
  .inputValidator((payload) => z.object({ projectId: z.number() }).parse(payload))
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }
    const project = await db()?.query.projects.findFirst({
      where: eq(projects.id, data.projectId),
    });
    return project;
  });
