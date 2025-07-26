import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
  beforeLoad: () => {
    throw redirect({
      to: "/dashboard/project",
    });
  },
});

export default function Dashboard() {
  return <div>Dashboard Home "/dashboard/"</div>;
}
