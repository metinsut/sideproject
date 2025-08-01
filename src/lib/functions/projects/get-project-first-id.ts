import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { getProjects } from "./get-projects";
import { PROJECT_ID } from "./set-project-id";

export const getProjectFirstIdFn = createServerFn({
  method: "GET",
  response: "data",
}).handler(async () => {
  const projectId = getCookie(PROJECT_ID);

  if (!projectId) {
    const projects = await getProjects();
    const firstProjectId = projects[0]?.id.toString() ?? "";
    return { projectId: firstProjectId };
  }
  return { projectId };
});
