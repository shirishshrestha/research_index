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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateTopicMutation,
  useUpdateTopicMutation,
} from "../hooks/mutations";
import { topicSchema, type TopicFormData } from "../schema";
import type { Topic } from "../types";
import { SquarePen } from "lucide-react";

export function TopicFormDialog({
  topic,
  onSuccess,
  children,
}: {
  topic?: Topic;
  onSuccess?: () => void;
  children?: React.ReactNode;
}) {
  const isEdit = Boolean(topic);
  const [open, setOpen] = React.useState(false);

  const form = useForm<TopicFormData>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      name: topic?.name || "",
      slug: topic?.slug || "",
      description: topic?.description || "",
      is_active: topic?.is_active !== undefined ? topic.is_active : true,
      order: topic?.order !== undefined ? topic.order : 0,
    },
  });

  const create = useCreateTopicMutation({
    onSuccess: () => {
      form.reset();
      setOpen(false);
      onSuccess?.();
    },
  });

  const update = useUpdateTopicMutation(topic?.id, {
    onSuccess: () => {
      setOpen(false);
      onSuccess?.();
    },
  });

  const onSubmit = (data: TopicFormData) => {
    // Remove empty strings for optional fields - backend auto-generates slug if not provided
    const payload = {
      ...data,
      slug: data.slug?.trim() || undefined,
      description: data.description?.trim() || undefined,
      icon: data.icon?.trim() || undefined,
    };
    if (isEdit) update.mutate(payload);
    else create.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button>{isEdit ? <SquarePen /> : "Create Topic"}</Button>}
      </DialogTrigger>
      <DialogContent className="md:max-w-3xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Topic" : "Create Topic"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormInputField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Enter topic name"
            />

            <FormTextareaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Enter topic description"
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

export default TopicFormDialog;
