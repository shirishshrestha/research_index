"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormInputField,
  FormTextareaField,
  FormSelectField,
  FormCheckboxField,
} from "@/components/form";
import { FormRichTextField } from "@/components/form/FormRichTextField";
import { Save, X, Image as ImageIcon } from "lucide-react";
import { issueFormSchema, type IssueFormSchema } from "../utils";
import {
  useCreateIssueMutation,
  useUpdateIssueMutation,
  prepareIssueFormData,
} from "../hooks";
import type { Issue } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ISSUE_STATUS_OPTIONS } from "../constants";

interface IssueFormProps {
  journalId: number | string;
  issue?: Issue;
  mode: "create" | "edit";
}

export function IssueForm({ journalId, issue, mode }: IssueFormProps) {
  const router = useRouter();
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    issue?.cover_image_url || null,
  );

  const form = useForm({
    resolver: zodResolver(issueFormSchema),
    defaultValues: issue
      ? {
          volume: issue.volume,
          issue_number: issue.issue_number,
          title: issue.title || "",
          description: issue.description || "",
          publication_date: issue.publication_date,
          submission_deadline: issue.submission_deadline || "",
          doi: issue.doi || "",
          pages_range: issue.pages_range || "",
          editorial_note: issue.editorial_note || "",
          guest_editors: issue.guest_editors || "",
          status: issue.status,
          is_special_issue: issue.is_special_issue,
        }
      : {
          volume: 1,
          issue_number: 1,
          title: "",
          description: "",
          publication_date: "",
          submission_deadline: "",
          doi: "",
          pages_range: "",
          editorial_note: "",
          guest_editors: "",
          status: "draft",
          is_special_issue: false,
        },
  });

  const createMutation = useCreateIssueMutation(journalId, {
    onSuccess: (data) => {
      router.push(`/institution/journals/${journalId}/issues`);
    },
  });

  const updateMutation = useUpdateIssueMutation(journalId, issue?.id, {
    onSuccess: () => {
      router.push(`/institution/journals/${journalId}/issues/${issue!.id}`);
    },
  });

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("cover_image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCoverImage = () => {
    form.setValue("cover_image", undefined);
    setCoverImagePreview(null);
  };

  const onSubmit = (data: IssueFormSchema) => {
    const formData = prepareIssueFormData(data);
    if (mode === "create") {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate(formData);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details for this journal issue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputField
                control={form.control}
                name="volume"
                label="Volume Number"
                type="number"
                placeholder="1"
              />
              <FormInputField
                control={form.control}
                name="issue_number"
                label="Issue Number"
                type="number"
                placeholder="1"
              />
            </div>

            <FormInputField
              control={form.control}
              name="title"
              label="Issue Title (Optional)"
              placeholder="e.g., Special Issue on AI Research"
            />

            <FormRichTextField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Brief description of this issue..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputField
                control={form.control}
                name="publication_date"
                label="Publication Date"
                type="date"
              />
              <FormInputField
                control={form.control}
                name="submission_deadline"
                label="Submission Deadline (Optional)"
                type="date"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelectField
                control={form.control}
                name="status"
                label="Status"
                options={
                  ISSUE_STATUS_OPTIONS as unknown as {
                    value: string;
                    label: string;
                  }[]
                }
              />
              <FormCheckboxField
                control={form.control}
                name="is_special_issue"
                label="This is a special issue"
              />
            </div>
          </CardContent>
        </Card>

        {/* Cover Image */}
        <Card>
          <CardHeader>
            <CardTitle>Cover Image</CardTitle>
            <CardDescription>
              Upload a cover image for this issue (optional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Cover Image</Label>
              {coverImagePreview ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-full object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeCoverImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                    id="cover-upload"
                  />
                  <Label
                    htmlFor="cover-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      Click to upload cover image
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG up to 10MB
                    </span>
                  </Label>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
            <CardDescription>
              Optional metadata and editorial information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputField
                control={form.control}
                name="doi"
                label="DOI"
                placeholder="10.1234/example"
              />
              <FormInputField
                control={form.control}
                name="pages_range"
                label="Pages Range"
                placeholder="e.g., 1-150"
              />
            </div>

            <FormRichTextField
              control={form.control}
              name="editorial_note"
              label="Editorial Note"
              placeholder="Editor's note for this issue..."
            />

            <FormRichTextField
              control={form.control}
              name="guest_editors"
              label="Guest Editors"
              placeholder="Guest editors for special issues..."
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
                ? "Create Issue"
                : "Update Issue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
