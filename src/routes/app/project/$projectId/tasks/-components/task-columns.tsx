"use client";

import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import type { tasks } from "@/lib/db/schema";
import { TaskAction } from "./task-action";

type Task = typeof tasks.$inferSelect;

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

export function useTaskColumns() {
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          <div className="font-medium truncate">{row.original.title}</div>
          {row.original.description && (
            <div className="text-sm text-muted-foreground truncate mt-1">
              {row.original.description}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant="secondary"
          className={statusColors[row.original.status as keyof typeof statusColors]}
        >
          {formatStatus(row.original.status)}
        </Badge>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className={priorityColors[row.original.priority as keyof typeof priorityColors]}
        >
          {row.original.priority ? formatPriority(row.original.priority) : "-"}
        </Badge>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm">{dayjs(row.original.createdAt).format("DD/MM/YYYY") || "-"}</div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.updatedAt !== row.original.createdAt
            ? dayjs(row.original.updatedAt).format("DD/MM/YYYY")
            : "-"}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => <TaskAction taskId={row.original.id} />,
    },
  ];
  return columns;
}
