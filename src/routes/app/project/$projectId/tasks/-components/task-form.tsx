import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { taskPriorityEnum, taskStatusEnum, tasks } from "@/lib/db/schema";
import type { CreateTaskSchema } from "@/lib/functions/tasks/create-task";
import type { UpdateTaskSchema } from "@/lib/functions/tasks/update-task";

interface TaskFormProps {
  projectId: number;
  task?: Task;
  onCreate?: (data: CreateTaskSchema) => void;
  onUpdate?: (data: UpdateTaskSchema) => void;
  onCancel: () => void;
  loading?: boolean;
}

type Task = typeof tasks.$inferSelect;

export function TaskForm({
  projectId,
  task,
  onCreate,
  onUpdate,
  onCancel,
  loading,
}: TaskFormProps) {
  const form = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      priority: (task?.priority as (typeof taskPriorityEnum.enumValues)[number]) || "medium",
      status: task
        ? (task.status as (typeof taskStatusEnum.enumValues)[number])
        : ("created" as const),
    },
    onSubmit: async ({ value }) => {
      if (task) {
        onUpdate?.({
          id: task.id,
          title: value.title,
          description: value.description,
          priority: value.priority,
          status: value.status,
        });
      } else {
        onCreate?.({
          projectId,
          title: value.title,
          description: value.description,
          priority: value.priority,
        });
      }
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="title"
        validators={{
          onChange: ({ value }) => {
            if (!value) return "Title is required";
            if (value.length > 255) return "Title must be less than 255 characters";
            return undefined;
          },
        }}
      >
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Title</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Task title"
            />
            {field.state.meta.isTouched && field.state.meta.errors ? (
              <p className="text-sm text-red-500 mt-1">{field.state.meta.errors.join(", ")}</p>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Description</Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Task description (optional)"
              rows={3}
            />
            {field.state.meta.isTouched && field.state.meta.errors ? (
              <p className="text-sm text-red-500 mt-1">{field.state.meta.errors.join(", ")}</p>
            ) : null}
          </div>
        )}
      </form.Field>

      <form.Field name="priority">
        {(field) => (
          <div>
            <Label htmlFor={field.name}>Priority</Label>
            <Select
              value={field.state.value}
              onValueChange={(value) =>
                field.handleChange(value as (typeof taskPriorityEnum.enumValues)[number])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            {field.state.meta.isTouched && field.state.meta.errors ? (
              <p className="text-sm text-red-500 mt-1">{field.state.meta.errors.join(", ")}</p>
            ) : null}
          </div>
        )}
      </form.Field>

      {task && (
        <form.Field name="status">
          {(field) => (
            <div>
              <Label htmlFor={field.name}>Status</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) =>
                  field.handleChange(value as (typeof taskStatusEnum.enumValues)[number])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="waiting_for_review">Waiting for Review</SelectItem>
                  <SelectItem value="revision_requested">Revision Requested</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="needs_info">Needs Info</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="reopened">Reopened</SelectItem>
                </SelectContent>
              </Select>
              {field.state.meta.isTouched && field.state.meta.errors ? (
                <p className="text-sm text-red-500 mt-1">{field.state.meta.errors.join(", ")}</p>
              ) : null}
            </div>
          )}
        </form.Field>
      )}

      <div className="flex gap-2">
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit || loading}>
              {loading || isSubmitting ? "Saving..." : task ? "Update" : "Create"}
            </Button>
          )}
        </form.Subscribe>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
