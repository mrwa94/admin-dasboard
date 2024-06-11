"use client";

import { Plus } from "lucide-react";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-tabel";
import { useParams , useRouter } from "next/navigation";

import { BillboardColumns, Columns } from "./columns";
interface BillboardProps {
  data:BillboardColumns[]
}
export const BillboardClient :React.FC<BillboardProps> = ({
  data
}) => {
    const router = useRouter();
    const params = useParams();
  return (


    <>
  <div className="flex items-center  justify-between">
      <Heading
        title={`Billboard (${data.length})`}
        description="Manage billboard for your store."
      />
      <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)}>
        <Plus className="ml-2 w-4 h-4" />
        Add new
      </Button>
    </div>
    <Separator />
   <DataTable columns={Columns} data={data} searchKey="label"/>
    </>
  );
};
