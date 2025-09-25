import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { getUser } from "@/lib/functions/auth/getUser";

export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const projectList = await db()?.query.projects.findMany({
    where: eq(projects.creatorId, user.id),
  });
  return projectList;
});
