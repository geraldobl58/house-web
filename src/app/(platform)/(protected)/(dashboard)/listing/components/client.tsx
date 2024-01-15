"use client";

import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ListingColumn, columns } from "./columns";

interface ListingClientProps {
  data: ListingColumn[];
}

export const ListingClient = ({ data }: ListingClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Imóveis(${data.length})`}
          description="Gerenciamento de imóveis"
        />
        <Button onClick={() => router.push(`/listing/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Registro
        </Button>
      </div>
      <Separator />
      <div className="mt-4">
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
    </>
  );
};
