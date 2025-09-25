import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";
import { getUser } from "@/lib/functions/auth/getUser";

export const deleteTask = createServerFn({
  method: "POST",
})
  .inputValidator((payload) => z.object({ id: z.number() }).parse(payload))
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("User not found");
    }

    const deletedTask = await db()?.delete(tasks).where(eq(tasks.id, data.id)).returning();

    if (!deletedTask?.[0]) {
      throw new Error("Task not found");
    }

    return { success: true, deletedTask: deletedTask[0] };
  });
