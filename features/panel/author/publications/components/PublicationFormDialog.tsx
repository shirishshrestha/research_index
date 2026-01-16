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
import { FormSelectField } from "@/components/form/FormSelectField";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreatePublicationMutation,
  useUpdatePublicationMutation,
} from "../hooks/mutations";
import { publicationSchema, type PublicationFormSchema } from "../schema";
import type { Publication } from "../types";
import { PUBLICATION_TYPE_OPTIONS } from "../constants";
import { SquarePen } from "lucide-react";

export function PublicationFormDialog({
  publication,
  onSuccess,
}: {
  publication?: Publication;
  onSuccess?: () => void;
}) {
  const isEdit = Boolean(publication);
  const [open, setOpen] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(publicationSchema),
    defaultValues: {
      title: publication?.title || "",
      abstract: publication?.abstract || "",
      publication_type: publication?.publication_type || "journal_article",
      doi: publication?.doi || "",
      published_date: publication?.published_date || "",
      journal_name: publication?.journal_name || "",
      volume: publication?.volume || "",
      issue: publication?.issue || "",
      pages: publication?.pages || "",
      publisher: publication?.publisher || "",
      co_authors: publication?.co_authors || "",
      pubmed_id: publication?.pubmed_id || "",
      arxiv_id: publication?.arxiv_id || "",
      pubmed_central_id: publication?.pubmed_central_id || "",
      is_published:
        publication?.is_published !== undefined
          ? publication.is_published
          : true,
      topic_branch: publication?.topic_branch?.id || undefined,
    },
  });

  const create = useCreatePublicationMutation({
    onSuccess: () => {
      form.reset();
      setOpen(false);
      onSuccess?.();
    },
  });

  const update = useUpdatePublicationMutation(publication?.id, {
    onSuccess: () => {
      setOpen(false);
      onSuccess?.();
    },
  });

  const onSubmit = (data: PublicationFormSchema) => {
    // Remove empty strings for optional fields
    const payload = {
      ...data,
      abstract: data.abstract?.trim() || undefined,
      doi: data.doi?.trim() || undefined,
      published_date: data.published_date || undefined,
      journal_name: data.journal_name?.trim() || undefined,
      volume: data.volume?.trim() || undefined,
      issue: data.issue?.trim() || undefined,
      pages: data.pages?.trim() || undefined,
      publisher: data.publisher?.trim() || undefined,
      co_authors: data.co_authors?.trim() || undefined,
      pubmed_id: data.pubmed_id?.trim() || undefined,
      arxiv_id: data.arxiv_id?.trim() || undefined,
      pubmed_central_id: data.pubmed_central_id?.trim() || undefined,
      topic_branch: data.topic_branch || undefined,
    };

    if (isEdit) update.mutate(payload);
    else create.mutate(payload);
  };

  const isPublished = useWatch({ control: form.control, name: "is_published" });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          {isEdit ? <SquarePen /> : "Create Publication"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Publication" : "Create Publication"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            {/* Basic Information */}
            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">Basic Information</h3>

              <FormInputField
                control={form.control}
                name="title"
                label="Title"
                placeholder="Enter publication title"
              />

              <FormTextareaField
                control={form.control}
                name="abstract"
                label="Abstract"
                placeholder="Enter publication abstract"
              />

              <FormSelectField
                control={form.control}
                name="publication_type"
                label="Publication Type"
                options={PUBLICATION_TYPE_OPTIONS.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
              />
            </div>

            {/* Publication Details */}
            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">Publication Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <FormInputField
                  control={form.control}
                  name="doi"
                  label="DOI"
                  placeholder="10.1234/example.2024.001"
                />

                <FormInputField
                  control={form.control}
                  name="published_date"
                  label="Published Date"
                  type="date"
                />
              </div>

              <FormInputField
                control={form.control}
                name="journal_name"
                label="Journal/Conference Name"
                placeholder="Journal of Example Research"
              />

              <div className="grid grid-cols-3 gap-4">
                <FormInputField
                  control={form.control}
                  name="volume"
                  label="Volume"
                  placeholder="10"
                />

                <FormInputField
                  control={form.control}
                  name="issue"
                  label="Issue"
                  placeholder="2"
                />

                <FormInputField
                  control={form.control}
                  name="pages"
                  label="Pages"
                  placeholder="123-145"
                />
              </div>

              <FormInputField
                control={form.control}
                name="publisher"
                label="Publisher"
                placeholder="Academic Press"
              />

              <FormTextareaField
                control={form.control}
                name="co_authors"
                label="Co-Authors"
                placeholder="Jane Smith, John Doe, Alice Johnson"
                description="Comma-separated list of co-authors"
              />
            </div>

            {/* Identifiers */}
            <div className="grid gap-4">
              <h3 className="text-sm font-semibold">External Identifiers</h3>

              <div className="grid grid-cols-3 gap-4">
                <FormInputField
                  control={form.control}
                  name="pubmed_id"
                  label="PubMed ID"
                  placeholder="12345678"
                />

                <FormInputField
                  control={form.control}
                  name="arxiv_id"
                  label="arXiv ID"
                  placeholder="2101.12345"
                />

                <FormInputField
                  control={form.control}
                  name="pubmed_central_id"
                  label="PMC ID"
                  placeholder="PMC1234567"
                />
              </div>
            </div>

            {/* Settings */}
            <div className="flex items-center justify-between py-2">
              <Label htmlFor="is_published">Publicly Visible</Label>
              <Switch
                id="is_published"
                checked={isPublished}
                onCheckedChange={(checked) =>
                  form.setValue("is_published", checked)
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
