import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/project/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard/project/$/"!</div>;
}
