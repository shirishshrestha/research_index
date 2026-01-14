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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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

export function BranchFormDialog({
  topicPk,
  branch,
  onSuccess,
}: {
  topicPk?: number | string;
  branch?: TopicBranch;
  onSuccess?: () => void;
}) {
  const isEdit = Boolean(branch);
  const [open, setOpen] = React.useState(false);

  const form = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      topic: branch?.topic ?? Number(topicPk),
      parent: branch?.parent || null,
      name: branch?.name || "",
      slug: branch?.slug || "",
      description: branch?.description || "",
      is_active: branch?.is_active !== undefined ? branch.is_active : true,
      order: branch?.order !== undefined ? branch.order : 0,
    },
  });

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
    const payload = {
      ...data,
      topic: Number(topicPk),
    };
    if (isEdit) update.mutate(payload);
    else create.mutate(payload);
  };

  const isActive = useWatch({ control: form.control, name: "is_active" });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">{isEdit ? "Edit" : "Add Branch"}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Branch" : "Create Branch"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormInputField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter branch name"
            />

            <FormInputField
              control={form.control}
              name="slug"
              label="Slug"
              placeholder="auto-generated-slug"
              description="Leave empty to auto-generate from name"
            />

            <FormTextareaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter branch description"
            />

            <FormInputField
              control={form.control}
              name="parent"
              label="Parent Branch (Optional)"
              type="number"
              placeholder="Leave empty for root branch"
              description="Enter parent branch ID for nested structure"
            />

            <FormInputField
              control={form.control}
              name="order"
              label="Display Order"
              type="number"
              placeholder="0"
            />

            <div className="flex items-center justify-between py-2">
              <Label htmlFor="is_active">Active</Label>
              <Switch
                id="is_active"
                checked={isActive}
                onCheckedChange={(checked) =>
                  form.setValue("is_active", checked)
                }
              />
            </div>

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
