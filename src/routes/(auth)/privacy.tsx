import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/privacy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(auth)/privacy"!</div>;
}
