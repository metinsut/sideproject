import { Link } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";

type LinkItemProps = {
  to: string;
  children: React.ReactNode;
};

const LinkItem = (props: LinkItemProps) => {
  const { to, children } = props;
  return (
    <Link to={to} activeProps={{ className: "font-bold" }} activeOptions={{ exact: true }}>
      {children}
    </Link>
  );
};

type SidebarProps = React.ComponentProps<typeof Sidebar>;

export const AppSidebar = (props: SidebarProps) => {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-4">
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-4">
            <LinkItem to="/dashboard">Dashboard</LinkItem>
            <LinkItem to="/dashboard/page">Page</LinkItem>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};
