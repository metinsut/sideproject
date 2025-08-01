import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setProjectIdFn } from "@/lib/functions/projects/set-project-id";
import { useGetProjectFirstId, useGetProjects } from "@/queries/projects";

export function ProjectSelect() {
  const { data: projects } = useSuspenseQuery(useGetProjects());
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const {
    data: { projectId },
  } = useSuspenseQuery(useGetProjectFirstId());

  const handleValueChange = async (projectId: string) => {
    await setProjectIdFn({ data: { projectId } });

    const pathParts = pathname.split("/");
    const projectIndex = pathParts.findIndex((part) => part === "project");

    if (projectIndex !== -1 && pathParts.length > projectIndex + 1) {
      const oldProjectId = pathParts[projectIndex + 1];
      if (oldProjectId) {
        const newPath = pathname.replace(oldProjectId, projectId);
        navigate({ to: newPath, reloadDocument: true });
      }
    } else {
      navigate({
        to: "/app/project/$projectId",
        params: { projectId },
        reloadDocument: true,
      });
    }
  };

  return (
    <Select value={projectId} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id.toString()}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
