import { createFileRoute } from "@tanstack/react-router";
import { useGetProjectById } from "@/lib/queries/projects";

export const Route = createFileRoute("/app/project/$projectId/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const projectId = Number(params.projectId);
    const project = await context.queryClient.ensureQueryData(useGetProjectById(projectId));
    const crumb = [{ label: project?.name ?? "Project", href: "/app/project" }];
    return { project, crumb };
  },
});

function RouteComponent() {
  const { project } = Route.useLoaderData();
  return <div>{project?.name}</div>;
}
