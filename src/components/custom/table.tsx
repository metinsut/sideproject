"use client";
import type { Row, Table as TableType } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as TableUI,
} from "@/components/ui/table";

type Props<T> = {
  table: TableType<T>;
  onRowClick?: (row: Row<T>) => void;
  noResult?: React.ReactNode;
};

export function Table<T>(props: Props<T>) {
  const { table, onRowClick, noResult = "No results." } = props;
  return (
    <div className="rounded-md border">
      <TableUI>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick?.(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                {noResult}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableUI>
    </div>
  );
}
