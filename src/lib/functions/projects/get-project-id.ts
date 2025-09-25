import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { PROJECT_ID } from "./set-project-id";

export const getProjectIdFn = createServerFn({
  method: "GET",
}).handler(async () => {
  const projectId = getCookie(PROJECT_ID);
  return projectId || null;
});
