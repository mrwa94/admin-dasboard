"use client";

import { Plus } from "lucide-react";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-tabel";
import { useParams, useRouter } from "next/navigation";

import { CategoriesColumns, Columns } from "./columns";
import ApiList from "@/components/ui/api-list";

interface CategoriesProps {
  data: CategoriesColumns[];
}
export const CategoriesClient: React.FC<CategoriesProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center  justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage Categories for your store."
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="ml-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="name" />
      <Heading title="  Api" description="API cells for Categories ." />
      <ApiList entityIdName="categories" entityName="category  Id" />
    </>
  );
};
