import { createFileRoute } from "@tanstack/react-router";
import { getProjectIdFn } from "@/lib/functions/projects/get-project-id";
import { useGetProjects } from "@/lib/queries/projects";
import { Project } from "./-project";

export const Route = createFileRoute("/app/project/")({
  component: ProjectList,
  loader: async ({ context: { queryClient } }) => {
    const projects = await queryClient.ensureQueryData(useGetProjects());
    const projectId = await getProjectIdFn();
    return { projects, projectId, crumb: "Projects" };
  },
  head: () => ({
    meta: [{ title: "Projects" }],
  }),
});

function ProjectList() {
  return <Project />;
}
