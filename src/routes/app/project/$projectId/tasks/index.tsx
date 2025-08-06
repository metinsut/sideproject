import { createFileRoute } from "@tanstack/react-router";
import { useGetProjectById } from "@/queries/projects";

export const Route = createFileRoute("/app/project/$projectId/tasks/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const projectId = Number(params.projectId);
    const project = await context.queryClient.ensureQueryData(useGetProjectById(projectId));
    const crumb = [{ label: project?.name ?? "Project", href: "/app/project" }, { label: "Tasks" }];

    return {
      project,
      crumb,
    };
  },
});

function RouteComponent() {
  return <div>Hello "/app/project/$projectId/tasks/"!</div>;
}
