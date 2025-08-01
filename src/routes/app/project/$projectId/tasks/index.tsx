import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/project/$projectId/tasks/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/project/$projectId/tasks/"!</div>;
}
