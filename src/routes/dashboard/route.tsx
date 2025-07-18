import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/routes/dashboard/-layout/app-sidebar";
import { Header } from "@/routes/dashboard/-layout/header";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="px-4 py-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
