import { createFileRoute } from "@tanstack/react-router";
import { getProjectById } from "@/lib/functions/projects/get-project-by-id";

export const Route = createFileRoute("/dashboard/project/$projectId/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const projectId = Number(params.projectId);
    const project = await getProjectById({ data: { projectId } });
    return {
      project,
      crumb: project?.name ?? "Project",
    };
  },
});

function RouteComponent() {
  const { project } = Route.useLoaderData();
  return <div>{project?.name}</div>;
}
