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
  loader: async () => {
    return {
      crumb: "Dashboard",
    };
  },
});

function Dashboard() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 px-4 py-2">{<Outlet />}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
