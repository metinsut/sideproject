import { Link } from "@tanstack/react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BreadCrumb } from "./breadcrumb";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <BreadCrumb />
      </div>
      <div className="grid">
        <Link to="/app" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="size-8 rounded-lg" />
          <span className="text-sm font-semibold">Project Flow</span>
        </Link>
      </div>
    </header>
  );
}
