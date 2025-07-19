import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/board/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Dashboard Page "/dashboard/page/"</div>;
}
