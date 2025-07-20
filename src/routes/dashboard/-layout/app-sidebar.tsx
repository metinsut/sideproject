import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

type LinkItemProps = {
  to: string;
  children: React.ReactNode;
};

const LinkItem = (props: LinkItemProps) => {
  const { to, children } = props;
  return (
    <Link
      to={to}
      activeProps={{ className: "font-bold" }}
      activeOptions={{ exact: true }}
      className="p-2"
    >
      {children}
    </Link>
  );
};

type SidebarProps = React.ComponentProps<typeof Sidebar>;

export const AppSidebar = (props: SidebarProps) => {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/dashboard">
                <img src="/logo.png" alt="logo" className="size-8 rounded-lg" />
                Project Flow
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <LinkItem to="/dashboard">Home</LinkItem>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <LinkItem to="/dashboard/board">Board</LinkItem>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
