import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { getUser } from "@/lib/auth/functions/getUser";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";

export const getProjects = createServerFn({
  method: "GET",
  response: "data",
}).handler(async () => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  const projectList = await db.query.projects.findMany({
    where: eq(projects.creatorId, user.id),
  });
  return projectList;
});
