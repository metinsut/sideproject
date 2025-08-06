import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import * as React from "react";
import { TaskForm } from "@/components/f/task-form";
import { TaskList } from "@/components/f/task-list";
import { Button } from "@/components/ui/button";
import type { tasks } from "@/lib/db/schema";
import type { CreateTaskSchema } from "@/lib/functions/tasks/create-task";
import type { UpdateTaskSchema } from "@/lib/functions/tasks/update-task";
import { useGetProjectById } from "@/queries/projects";
import { useCreateTask, useDeleteTask, useGetTasksByProject, useUpdateTask } from "@/queries/tasks";

type Task = typeof tasks.$inferSelect;

export const Route = createFileRoute("/app/project/$projectId/tasks/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const projectId = Number(params.projectId);
    const project = await context.queryClient.ensureQueryData(useGetProjectById(projectId));
    const crumb = [{ label: project?.name ?? "Project", href: "/app/project" }, { label: "Tasks" }];

    return {
      project,
      crumb,
    };
  },
});

function RouteComponent() {
  const { projectId } = Route.useParams();
  const projectIdNum = Number(projectId);

  const [showForm, setShowForm] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);

  const { data: tasks, isLoading } = useQuery(useGetTasksByProject(projectIdNum));
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  const handleCreateTask = (data: CreateTaskSchema) => {
    createTaskMutation.mutate(data, {
      onSuccess: () => {
        setShowForm(false);
      },
    });
  };

  const handleUpdateTask = (data: UpdateTaskSchema) => {
    updateTaskMutation.mutate(data, {
      onSuccess: () => {
        setEditingTask(null);
      },
    });
  };

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>
        {!showForm && !editingTask && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        )}
      </div>

      {(showForm || editingTask) && (
        <TaskForm
          projectId={projectIdNum}
          task={editingTask || undefined}
          onSubmit={(data) => {
            if (editingTask) {
              handleUpdateTask(data as UpdateTaskSchema);
            } else {
              handleCreateTask(data as CreateTaskSchema);
            }
          }}
          onCancel={handleCancelForm}
          loading={createTaskMutation.isPending || updateTaskMutation.isPending}
        />
      )}

      <TaskList
        tasks={tasks || []}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        loading={isLoading}
      />
    </div>
  );
}
