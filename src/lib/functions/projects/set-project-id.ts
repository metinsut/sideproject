import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import z from "zod";

export const PROJECT_ID = "selected_project_id";

export const setProjectIdFn = createServerFn({
  method: "POST",
})
  .inputValidator(z.object({ projectId: z.string() }))
  .handler(async ({ data: { projectId } }) => {
    setCookie(PROJECT_ID, projectId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  });
