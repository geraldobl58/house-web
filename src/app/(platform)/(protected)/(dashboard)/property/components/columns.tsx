"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type PropertyColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<PropertyColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
