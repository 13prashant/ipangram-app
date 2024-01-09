import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useApi from "../../hooks/useApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { departmentFormSchema } from "./helpers";

export default function DepartmentForm({
  id,
  name,
  description,
  isUpdate = false,
}) {
  const form = useForm({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: name || "",
      description: description || "",
    },
  });

  const { response, callApi } = useApi(`/departments`);

  const onSubmit = async (values) => {
    isUpdate
      ? await callApi(
          `/departments/${id}`,
          "PUT",
          { name: values.name, description: values.description },
          "New department updated successfully."
        )
      : await callApi(
          `/departments`,
          "POST",
          { name: values.name, description: values.description },
          "New department created successfully."
        );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <DialogHeader>
          <DialogTitle>Create department</DialogTitle>
        </DialogHeader>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          {isUpdate ? (
            <Button type="submit" disabled={response.isPending}>
              {response.isPending ? "Updating..." : "Update"}
            </Button>
          ) : (
            <Button type="submit" disabled={response.isPending}>
              {response.isPending ? "Creating..." : "Create"}
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}
