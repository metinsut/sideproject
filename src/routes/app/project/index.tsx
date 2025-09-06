import { createFileRoute, useLoaderData, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectIdFn } from "@/lib/functions/projects/get-project-id";
import { useChangeProject, useGetProjects } from "@/lib/queries/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/project/")({
  component: ProjectList,
  loader: async ({ context }) => {
    const projects = await context.queryClient.ensureQueryData(useGetProjects());
    const projectId = await getProjectIdFn();

    return { projects, projectId, crumb: "Projects" };
  },
  head: () => ({
    meta: [{ title: "Projects" }],
  }),
});

function ProjectList() {
  const { projects, projectId } = useLoaderData({ from: "/app/project/" });
  const navigate = useNavigate();
  const { t } = useTranslation("project");

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

  return (
    <div className="grid gap-4">
      <p className="text-2xl font-bold">{t("projects")}</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {projects.map((project) => {
          return (
            <Card
              key={project.id}
              onClick={() => handleChangeProject(project.id.toString())}
              className={cn(
                "hover:shadow-lg transition-shadow duration-100 cursor-pointer relative",
                {
                  "border border-green-200 bg-green-50": project.id === Number(projectId),
                },
              )}
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
                <p>Waiting Tasks: 0</p>
                <p>In Progress Tasks: 0</p>
                <p>Completed Tasks: 0</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
