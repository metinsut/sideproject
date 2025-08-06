import { createFileRoute, useLoaderData, useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { UpdateTaskSchema } from "@/lib/functions/tasks/update-task";
import { useGetTaskById, useUpdateTask } from "@/queries/tasks";
import { TaskForm } from "./-components/task-form";

export const Route = createFileRoute("/app/project/$projectId/tasks/$taskId")({
  component: TaskEditModal,
  loader: async ({ context, params }) => {
    const taskId = Number(params.taskId);
    const projectId = Number(params.projectId);
    const task = await context.queryClient.ensureQueryData(useGetTaskById(taskId));
    const crumb = [
      { label: "Tasks", href: `/app/project/${projectId}/tasks` },
      { label: `Edit: ${task.title}` },
    ];
    return { task, taskId: params.taskId, projectId: params.projectId, crumb };
  },
});

function TaskEditModal() {
  const { task, projectId } = useLoaderData({
    from: "/app/project/$projectId/tasks/$taskId",
  });
  const navigate = useNavigate();

  const updateTaskMutation = useUpdateTask();

  const handleSubmit = (data: UpdateTaskSchema) => {
    updateTaskMutation.mutate(data, {
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

  if (!task) {
    return (
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Loading...</DialogTitle>
          </DialogHeader>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          projectId={Number(projectId)}
          task={task}
          onUpdate={handleSubmit}
          onCancel={handleClose}
          loading={updateTaskMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
