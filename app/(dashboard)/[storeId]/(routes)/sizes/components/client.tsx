"use client";

import { Plus } from "lucide-react";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-tabel";
import { useParams, useRouter } from "next/navigation";

import { SizeColumns, Columns } from "./columns";
import ApiList from "@/components/ui/api-list";

//props
interface SizeClientProps {
  data: SizeColumns[];
}
export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center  justify-between">
        <Heading
          title={`Size (${data.length})`}
          description="Manage Sizes for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="ml-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="label" />
      <Heading title="  Api" description="Size cells for Sizes." />
      <ApiList entityIdName="sizeIs" entityName="sizeId" />
    </>
  );
};

