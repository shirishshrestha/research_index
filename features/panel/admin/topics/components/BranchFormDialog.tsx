"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form/FormInputField";
import { FormTextareaField } from "@/components/form/FormTextareaField";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateBranchMutation,
  useUpdateBranchMutation,
} from "../hooks/mutations";
import { branchSchema, type BranchFormData } from "../schema";
import type { TopicBranch } from "../types";
import { Plus, SquarePen } from "lucide-react";

export function BranchFormDialog({
  topicPk,
  branch,
  branchName,
  parentBranchId,
  onSuccess,
  children,
}: {
  topicPk?: number | string;
  branch?: TopicBranch;
  parentBranchId?: number | null;
  branchName?: string;
  onSuccess?: () => void;
  children?: React.ReactNode;
}) {
  const isEdit = Boolean(branch);
  const [open, setOpen] = React.useState(false);

  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      topic: branch?.topic ?? Number(topicPk),
      parent: branch?.parent || parentBranchId || null,
      name: branch?.name || "",
      slug: branch?.slug || "",
      description: branch?.description || "",
      is_active: branch?.is_active !== undefined ? branch.is_active : true,
      order: branch?.order !== undefined ? branch.order : 0,
    },
  });

  // Reset form when dialog opens with new parentBranchId
  React.useEffect(() => {
    if (open) {
      form.reset({
        topic: branch?.topic ?? Number(topicPk),
        parent: branch?.parent || parentBranchId || null,
        name: branch?.name || "",
        slug: branch?.slug || "",
        description: branch?.description || "",
        is_active: branch?.is_active !== undefined ? branch.is_active : true,
        order: branch?.order !== undefined ? branch.order : 0,
      });
    }
  }, [open, branch, parentBranchId, topicPk, form]);

  const create = useCreateBranchMutation(topicPk, {
    onSuccess: () => {
      form.reset();
      setOpen(false);
      onSuccess?.();
    },
  });

  const update = useUpdateBranchMutation(topicPk, branch?.id, {
    onSuccess: () => {
      setOpen(false);
      onSuccess?.();
    },
  });

  const onSubmit = (data: BranchFormData) => {
    // Remove empty strings for optional fields - backend auto-generates slug if not provided
    const payload = {
      ...data,
      topic: Number(topicPk),
      slug: data.slug?.trim() || undefined,
      description: data.description?.trim() || undefined,
      parent: data.parent ?? undefined,
    };
    if (isEdit) update.mutate(payload);
    else create.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={isEdit ? "outline" : "default"} size={"sm"}>
            {isEdit ? (
              <SquarePen />
            ) : (
              <>
                <Plus /> Add Branch
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Branch" : "Create Branch"}</DialogTitle>
          <p>
            {isEdit
              ? `Modify the details of the branch "${branch?.name}".`
              : `Fill in the details to create a new branch inside "${branchName}".`}
          </p>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormInputField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter branch name"
            />

            <FormTextareaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter branch description"
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={create.isPending || update.isPending}
              >
                {create.isPending || update.isPending
                  ? "Saving..."
                  : isEdit
                    ? "Save"
                    : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default BranchFormDialog;
