import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function useColumns<T>() {
  const columns: ColumnDef<T>[] = useMemo(
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
      },
      {
        header: "Updated At",
        accessorKey: "updatedAt",
      },
    ],
    [],
  );
  return columns;
}
