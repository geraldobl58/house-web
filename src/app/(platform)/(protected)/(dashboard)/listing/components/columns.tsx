"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ListingColumn = {
  id: string;
  name: string;
  price: string;
  bathroom: number;
  bedroom: number;
  garage: number;
  category: string;
  userName: string;
};

export const columns: ColumnDef<ListingColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "address",
    header: "Endereço",
  },
  {
    accessorKey: "neighborhood",
    header: "Bairro",
  },
  {
    accessorKey: "price",
    header: "Valor",
  },
  {
    accessorKey: "bathroom",
    header: "Banheiro",
  },
  {
    accessorKey: "bedroom",
    header: "Quartos",
  },
  {
    accessorKey: "garage",
    header: "Garagem",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "userName",
    header: "Usuário",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
