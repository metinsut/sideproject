import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="flex shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4 py-2">
        <SidebarTrigger className="-ml-1" />
      </div>
    </header>
  );
}
