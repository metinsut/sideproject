import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Suspense } from "react";
import { Table } from "@/components/custom/table";
import { useGetProjects } from "@/queries/projects";
import { useColumns } from "./-columns";
import { Toolbar } from "./-toolbar";

export const Route = createFileRoute("/app/project-list/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const projects = await context.queryClient.ensureQueryData(useGetProjects());
    const crumb = [{ label: "Project List", href: "/app/project-list" }];
    return { projects, crumb };
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
        <Table table={table} />
      </div>
    </Suspense>
  );
}
