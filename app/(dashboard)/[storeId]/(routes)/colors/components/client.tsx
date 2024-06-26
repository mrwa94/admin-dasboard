"use client";

import { Plus } from "lucide-react";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-tabel";
import { useParams, useRouter } from "next/navigation";

import { ColorColumns, Columns } from "./columns";
import ApiList from "@/components/ui/api-list";

//props
interface ColorClientProps {
  data: ColorColumns[];
}
export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center  justify-between">
        <Heading
          title={`Color (${data.length})`}
          description="Manage colors for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="ml-2 w-4 h-4" />
          Add new color
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="label" />
      <Heading title="  Api" description="Color cells for colors." />
      <ApiList entityIdName="colors" entityName="colorId" />
    </>
  );
};

