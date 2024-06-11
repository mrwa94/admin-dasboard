"use client";

import {
  DropdownMenu,
  DropdownMenuContent,

  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { BillboardColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash, User } from "lucide-react";
import toast from "react-hot-toast";

interface CellActionProps {
  data: BillboardColumns;
}
const CellAction: React.FC<CellActionProps> = ({data}) => {

    

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Id copied successfully')
  };


   
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* options */}
      <DropdownMenuContent
        align="end"
        className="bg-white  shadow-md  w-32  text-left  rounded-md p-2"
      >
        <DropdownMenuLabel className="pb-2  font-bold ">
          Action
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem  className=" pb-2 " >
          <Edit className=" h-4 w-4  inline  mr-2" />
          Update
        </DropdownMenuItem>

        <DropdownMenuItem className=" pb-2 " onClick={()=>onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4 inline" />
          Copy Id
        </DropdownMenuItem>

        <DropdownMenuItem className=" pb-2 ">
          <Trash className=" h-4 w-4  inline  mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellAction;
