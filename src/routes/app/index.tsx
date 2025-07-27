import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
  beforeLoad: () => {
    throw redirect({
      to: "/app/project",
    });
  },
});

export default function Dashboard() {
  return <div>Dashboard Home "/dashboard/"</div>;
}
