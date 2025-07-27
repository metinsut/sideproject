import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useMemo } from "react";
import type { ProjectType } from "@/lib/db/schema";

export function useColumns() {
  const columns: ColumnDef<ProjectType>[] = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        accessorFn: (row) => dayjs(row.createdAt).format("DD-MMM-YYYY"),
      },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
        accessorFn: (row) => dayjs(row.updatedAt).format("DD-MMM-YYYY"),
      },
    ],
    [],
  );
  return columns;
}
