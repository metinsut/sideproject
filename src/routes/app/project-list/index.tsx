import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Suspense } from "react";
import { FTable } from "@/components/f/f-table";
import { useGetProjects } from "@/queries/projects";
import { useColumns } from "./-columns";
import { Toolbar } from "./-toolbar";

export const Route = createFileRoute("/app/project-list/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const projects = await context.queryClient.ensureQueryData(useGetProjects());
    return { projects, crumb: "Project List" };
  },
});

function RouteComponent() {
  const { data: projects } = useSuspenseQuery(useGetProjects());
  const columns = useColumns();

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-4">
        <Toolbar />
        <FTable table={table} />
      </div>
    </Suspense>
  );
}
