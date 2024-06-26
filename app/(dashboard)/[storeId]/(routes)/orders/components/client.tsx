"use client";

import { Plus } from "lucide-react";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-tabel";
import { useParams, useRouter } from "next/navigation";

import { OrdersColumns, Columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface CategoriesProps {
  data: OrdersColumns[];
}
export const CategoriesClient: React.FC<CategoriesProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
        <Heading
          title={`Orders (${data.length})`}
          description="Manage Orders for your store."
        />
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="name" />

    </>
  );
};