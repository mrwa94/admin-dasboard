"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import CellAction from "./cell-action";

export type BillboardColumns = {
  id: string;
  amount: number;
  status: string;
};

export const Columns: ColumnDef<BillboardColumns>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
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
    id:'actions',
    cell: ({row})=> <CellAction data={row.original}/>
  }
  
  
];
