import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetProjectById } from "@/lib/queries/projects";
import { useGetTasksByProject } from "@/lib/queries/tasks";
import { useTaskColumns } from "./-components/task-columns";
import { TaskDataTable } from "./-components/task-data-table";

export const Route = createFileRoute("/app/project/$projectId/tasks/")({
  component: TaskListPage,
  loader: async ({ context, params }) => {
    const projectId = Number(params.projectId);
    const project = await context.queryClient.ensureQueryData(useGetProjectById(projectId));
    const tasks = await context.queryClient.ensureQueryData(useGetTasksByProject(projectId));
    const crumb = [{ label: project?.name ?? "Project", href: "/app/project" }, { label: "Tasks" }];

    return {
      projectId: params.projectId,
      project,
      tasks,
      crumb,
    };
  },
});

function TaskListPage() {
  const { projectId, tasks } = useLoaderData({ from: "/app/project/$projectId/tasks/" });

  const columns = useTaskColumns();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Button asChild>
          <Link to="/app/project/$projectId/tasks/new" params={{ projectId }}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Link>
        </Button>
      </div>
      <TaskDataTable columns={columns} data={tasks || []} />
    </div>
  );
}
