import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { CreateTaskSchema } from "@/lib/functions/tasks/create-task";
import { useCreateTask } from "@/queries/tasks";
import { TaskForm } from "./-components/task-form";

export const Route = createFileRoute("/app/project/$projectId/tasks/new")({
  component: TaskCreateModal,
  loader: async ({ params }) => {
    const projectId = Number(params.projectId);
    const crumb = [
      { label: "Tasks", href: `/app/project/${projectId}/tasks` },
      { label: "Create New Task" },
    ];
    return { crumb };
  },
});

function TaskCreateModal() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const projectIdNum = Number(projectId);

  const createTaskMutation = useCreateTask();

  const handleSubmit = (data: CreateTaskSchema) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        navigate({
          to: "/app/project/$projectId/tasks",
          params: { projectId },
        });
      },
    });
  };

  const handleClose = () => {
    navigate({
      to: "/app/project/$projectId/tasks",
      params: { projectId },
    });
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          projectId={projectIdNum}
          onCreate={handleSubmit}
          onCancel={handleClose}
          loading={createTaskMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
