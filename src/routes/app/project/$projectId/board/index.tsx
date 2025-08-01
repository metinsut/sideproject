import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/project/$projectId/board/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/project/$projectId/board/"!</div>;
}
