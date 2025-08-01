import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { MenuList } from "./menu-list";
import { NavUser } from "./nav-user";
import { ProjectSelect } from "./project-select";

type SidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar(props: SidebarProps) {
  return (
    <Sidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...props}>
      <SidebarContent>
        <MenuList />
      </SidebarContent>
      <SidebarFooter>
        <ProjectSelect />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
