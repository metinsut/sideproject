import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
  beforeLoad: () => {
    throw redirect({
      to: "/app/project",
    });
  },
});

function Dashboard() {
  return <div>App Home "/app/"</div>;
}
