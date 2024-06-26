"use client";

import { Plus } from "lucide-react";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-tabel";
import { useParams, useRouter } from "next/navigation";

import { Columns, ProductColumn } from "./columns";
import ApiList from "@/components/ui/api-list";

interface ProductProps {
  data: ProductColumn[];
}
export const ProductClient: React.FC<ProductProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center  justify-between">
        <Heading
          title={`Product (${data.length})`}
          description="Manage product for your store."
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="ml-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="name" />
      <Heading title="  Api" description="product cells for products." />
    
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
};
