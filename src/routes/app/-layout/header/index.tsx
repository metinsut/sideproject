import { Link } from "@tanstack/react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BreadCrumb } from "./breadcrumb";

export function Header() {
  return (
    <header
      className={cn(
        "bg-background sticky top-0 z-50 grid grid-flow-col justify-between",
        "w-full items-center border-b h-[var(--header-height)]",
      )}
    >
      <div className="grid grid-flow-col w-full items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <BreadCrumb />
      </div>
      <Link to="/app" className="grid grid-flow-col items-center gap-2 px-4">
        <img src="/logo.png" alt="logo" className="size-8 rounded-lg" />
        <div className="text-sm font-semibold whitespace-nowrap">Project Flow</div>
      </Link>
    </header>
  );
}
