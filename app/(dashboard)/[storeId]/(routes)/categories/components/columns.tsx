"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import CellAction from "./cell-action";

export type CategoriesColumns = {
  id: string;
  name: number;
  status: string;
  billboardLabel:string
};

export const Columns: ColumnDef<CategoriesColumns>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: 'Date'
  },
  {
    accessorKey: "billboard",
    header: 'Billboard',
    cell:({row})=>row.original.billboardLabel,
  },
  {
    id:'actions',
    cell: ({row})=> <CellAction data={row.original}/>
  }
  
  
];
