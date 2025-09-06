import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CreateTaskSchema } from "@/lib/functions/tasks/create-task";
import { createTask } from "@/lib/functions/tasks/create-task";
import { deleteTask } from "@/lib/functions/tasks/delete-task";
import { getTaskById } from "@/lib/functions/tasks/get-task-by-id";
import { getTasksByProject } from "@/lib/functions/tasks/get-tasks-by-project";
import type { UpdateTaskSchema } from "@/lib/functions/tasks/update-task";
import { updateTask } from "@/lib/functions/tasks/update-task";

export function useGetTasksByProject(projectId: number) {
  return queryOptions({
    queryKey: ["tasks", "project", projectId],
    queryFn: () => getTasksByProject({ data: { projectId } }),
  });
}

export function useGetTaskById(taskId: number) {
  return queryOptions({
    queryKey: ["tasks", "task", taskId],
    queryFn: () => getTaskById({ data: { id: taskId } }),
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskSchema) => createTask({ data }),

    onSuccess: (newTask) => {
      if (newTask) {
        queryClient.invalidateQueries({ queryKey: ["tasks", "project", newTask.projectId] });
      }
      toast.success("Task başarıyla oluşturuldu!");
    },

    onError: (err: Error) => {
      let parsedError: unknown;

      try {
        parsedError = JSON.parse(err.message);
      } catch (e) {
        toast.error(err.message || "Beklenmedik bir sunucu hatası oluştu.");
        console.error("Parsing Error:", e);
        return;
      }

      if (
        Array.isArray(parsedError) &&
        parsedError.length > 0 &&
        typeof parsedError[0] === "object" &&
        parsedError[0] !== null &&
        "path" in parsedError[0] &&
        "message" in parsedError[0]
      ) {
        const firstIssue = parsedError[0];
        const fieldName = firstIssue.path.join(".");
        const errorMessage = `Doğrulama hatası: ${
          fieldName ? `${fieldName} - ` : ""
        }${firstIssue.message}`;
        toast.error(errorMessage);
      } else if (
        typeof parsedError === "object" &&
        parsedError !== null &&
        "message" in parsedError &&
        typeof parsedError.message === "string"
      ) {
        toast.error((parsedError as { message: string }).message);
      } else {
        toast.error("Bilinmeyen bir hata oluştu.");
      }
      console.error("API Error:", parsedError);
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTaskSchema) => updateTask({ data }),

    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", "project", updatedTask.projectId] });
      toast.success("Task başarıyla güncellendi!");
    },

    onError: (err: Error) => {
      let parsedError: unknown;

      try {
        parsedError = JSON.parse(err.message);
      } catch (e) {
        toast.error(err.message || "Task güncellenirken bir hata oluştu.");
        console.error("Parsing Error:", e);
        return;
      }

      if (
        Array.isArray(parsedError) &&
        parsedError.length > 0 &&
        typeof parsedError[0] === "object" &&
        parsedError[0] !== null &&
        "path" in parsedError[0] &&
        "message" in parsedError[0]
      ) {
        const firstIssue = parsedError[0];
        const fieldName = firstIssue.path.join(".");
        const errorMessage = `Doğrulama hatası: ${
          fieldName ? `${fieldName} - ` : ""
        }${firstIssue.message}`;
        toast.error(errorMessage);
      } else if (
        typeof parsedError === "object" &&
        parsedError !== null &&
        "message" in parsedError &&
        typeof parsedError.message === "string"
      ) {
        toast.error((parsedError as { message: string }).message);
      } else {
        toast.error("Bilinmeyen bir hata oluştu.");
      }
      console.error("API Error:", parsedError);
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: number) => deleteTask({ data: { id: taskId } }),

    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", "project", result.deletedTask.projectId],
      });
      toast.success("Task başarıyla silindi!");
    },

    onError: (err: Error) => {
      toast.error(err.message || "Task silinirken bir hata oluştu.");
      console.error("Delete Task Error:", err);
    },
  });
}
