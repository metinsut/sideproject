import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  onSubmit: (data: CreateTaskSchema | UpdateTaskSchema) => void;
  onCancel: () => void;
  loading?: boolean;
}

type Task = typeof tasks.$inferSelect;

export function TaskForm({ projectId, task, onSubmit, onCancel, loading }: TaskFormProps) {
  const [formData, setFormData] = React.useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: (task?.priority as (typeof taskPriorityEnum.enumValues)[number]) || "medium",
    status: task
      ? (task.status as (typeof taskStatusEnum.enumValues)[number])
      : ("created" as const),
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.title.length > 255) {
      newErrors.title = "Title must be less than 255 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (task) {
        onSubmit({
          id: task.id,
          title: formData.title,
          description: formData.description || undefined,
          priority: formData.priority,
          status: formData.status,
        });
      } else {
        onSubmit({
          projectId,
          title: formData.title,
          description: formData.description || undefined,
          priority: formData.priority,
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{task ? "Task Düzenle" : "Yeni Task"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Task title"
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Task description (optional)"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  priority: value as (typeof taskPriorityEnum.enumValues)[number],
                })
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
          </div>

          {task && (
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as (typeof taskStatusEnum.enumValues)[number],
                  })
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
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : task ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
