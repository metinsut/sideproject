import { createFileRoute } from "@tanstack/react-router";
import { useGetProjectById } from "@/queries/projects";

export const Route = createFileRoute("/app/project/$projectId/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const projectId = Number(params.projectId);
    const project = await context.queryClient.ensureQueryData(useGetProjectById(projectId));
    return { project, crumb: project?.name ?? "Project" };
  },
});

function RouteComponent() {
  const { project } = Route.useLoaderData();
  return <div>{project?.name}</div>;
}
