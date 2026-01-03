import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectType } from "@/lib/db/schema";
import { useChangeProject } from "@/lib/queries/projects";
import { cn } from "@/lib/utils";
import * as m from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

type Props = {
  project: ProjectType;
};

export function ProjectCard(props: Props) {
  const { project } = props;
  const { projectId } = useLoaderData({ from: "/app/project/" });
  const navigate = useNavigate();
  const updateProjectMutation = useChangeProject();

  const handleChangeProject = async (selectedProjectId: string) => {
    updateProjectMutation.mutateAsync(selectedProjectId, {
      onSuccess: () => {
        navigate({
          to: "/app/project",
          reloadDocument: true,
        });
      },
    });
  };

  const isLoading = updateProjectMutation.isPending;

  const runtimeLocale = getLocale();

  console.log({ runtimeLocale, files: m.completed_tasks() });

  return (
    <Card
      key={project.id}
      onClick={() => handleChangeProject(project.id.toString())}
      className={cn("hover:shadow-lg transition-shadow duration-100 cursor-pointer relative", {
        "border border-green-200 bg-green-50": project.id === Number(projectId),
        "animate-pulse": isLoading,
      })}
    >
      {updateProjectMutation.isPending && (
        <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{m.waiting_tasks()}: 0</p>
        <p>{m.in_progress_tasks()}: 0</p>
        <p>{m.completed_tasks()}: 0</p>
      </CardContent>
    </Card>
  );
}
