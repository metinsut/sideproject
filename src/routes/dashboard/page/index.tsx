import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/page/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Dashboard Page "/dashboard/page/"</div>;
}
