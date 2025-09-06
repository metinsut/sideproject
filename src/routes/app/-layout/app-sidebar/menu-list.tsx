import { useSuspenseQuery } from "@tanstack/react-query";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetProjectFirstId } from "@/lib/queries/projects";
import { LinkItem } from "./link-item";

export function MenuList() {
  const {
    data: { projectId },
  } = useSuspenseQuery(useGetProjectFirstId());

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <LinkItem to="/app/project/$projectId/tasks" params={{ projectId }}>
                Tasks
              </LinkItem>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <LinkItem to="/app/project/$projectId/board" params={{ projectId }}>
                Board
              </LinkItem>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
