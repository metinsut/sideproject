import { Link, useParams } from "@tanstack/react-router";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTask } from "@/queries/tasks";

type Props = {
  taskId: number;
};

export function TaskAction(props: Props) {
  const { taskId } = props;
  const { projectId } = useParams({ from: "/app/project/$projectId/tasks/" });

  const deleteTaskMutation = useDeleteTask();

  const handleDeleteTask = () => {
    deleteTaskMutation.mutateAsync(taskId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            to="/app/project/$projectId/tasks/$taskId"
            params={{ projectId, taskId: taskId.toString() }}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Task
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteTask} className="text-red-600 dark:text-red-400">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
