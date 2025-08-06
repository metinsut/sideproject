import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { tasks } from "@/lib/db/schema";

type Task = typeof tasks.$inferSelect;

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  loading?: boolean;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const statusColors = {
  created: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  assigned: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  in_progress: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  waiting_for_review: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  revision_requested: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  approved: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  cancelled: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  scheduled: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  on_hold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  blocked: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  needs_info: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  reopened: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
};

function formatStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatPriority(priority: string): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function TaskList({ tasks, onEditTask, onDeleteTask, loading }: TaskListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={`loading-${i}`}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No tasks found. Create your first task to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                {task.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {task.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge
                    variant="secondary"
                    className={statusColors[task.status as keyof typeof statusColors]}
                  >
                    {formatStatus(task.status)}
                  </Badge>
                  {task.priority && (
                    <Badge
                      variant="outline"
                      className={priorityColors[task.priority as keyof typeof priorityColors]}
                    >
                      {formatPriority(task.priority)}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                  {task.updatedAt !== task.createdAt && (
                    <span> • Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditTask(task)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDeleteTask(task.id)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
