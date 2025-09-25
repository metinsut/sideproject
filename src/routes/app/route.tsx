import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppLayout } from "@/routes/app/-layout";

export const Route = createFileRoute("/app")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AppRoot,
});

function AppRoot() {
  return <AppLayout />;
}
