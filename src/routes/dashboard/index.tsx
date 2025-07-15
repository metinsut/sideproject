import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
});

export default function Dashboard() {
  return <div>Dashboard Home "/dashboard/"</div>;
}
