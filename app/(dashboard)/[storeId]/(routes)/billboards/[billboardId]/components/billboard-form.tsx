"use client";

import { useState } from "react";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";

import { Billboard } from "@prisma/client";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";


const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});
type FormBillboardValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}



const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const form = useForm<FormBillboardValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
     imageUrl: " ",
    },
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
 
  const title = initialData ? "Edit billboard" : "create billboard";
  const description = initialData
    ? "Edit a billboard"
    : " Create new billboard";
  const toastMessage = initialData
    ? "billboard updated."
    : "Billboard created successfully";
  const action = initialData ? "Save changes" : "Create ";

  //post
  const onSubmit = async (data: FormBillboardValues) => {
    console.log(data);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);

      }

      router.refresh();
      router.push(`/${params.storeId}/billboards`)
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  //delete 
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);

      router.refresh();
      router.push("/");
      toast.success("deleted successfully");
    } catch (error) {
      toast.error("Make sure you delete all   categories using billboard first  !");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex justify-between  items-center">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className=" w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      {/* create a form */}
      <Form {...form}>
        <form
          className="w-full space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>background Image </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className=" ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default BillboardForm;
