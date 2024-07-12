"use client";
import { useRouter, useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { SizeColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash, User } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: SizeColumns;
}
const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Id copied successfully");
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);
      router.refresh();
      toast.success("deleted successful.");
    } catch (error) {
      toast.error( "Make sure you delete all product using this Size first  !");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={isLoading}
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
      />
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

          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/sizes/${data.id}`)
            }
            className=" pb-2 "
          >
            <Edit className=" h-4 w-4  inline  mr-2" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem className=" pb-2 " onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4 inline" />
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)} className=" pb-2 ">
            <Trash className=" h-4 w-4  inline  mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
