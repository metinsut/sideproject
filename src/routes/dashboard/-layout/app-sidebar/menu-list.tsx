import { useQuery } from "@tanstack/react-query";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getData } from "@/db-queries/projects";
import { LinkItem } from "./link-item";

export function MenuList() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getData,
  });
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <SidebarMenuItem key={`project-skeleton-${i + 1}`}>
                  <div className="p-2">
                    <Skeleton className="h-4 w-full" />
                  </div>
                </SidebarMenuItem>
              ))
            : projects?.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <LinkItem to={`/dashboard/project/${project.id}`}>{project.name}</LinkItem>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
