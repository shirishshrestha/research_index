"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormInputField,
  FormTextareaField,
  FormSelectField,
} from "@/components/form";
import { Save, X, Upload, Image as ImageIcon } from "lucide-react";
import { journalFormSchema, type JournalFormSchema } from "../utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJournal, updateJournal } from "../api";
import type { Journal } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const frequencyOptions = [
  { value: "monthly", label: "Monthly" },
  { value: "bimonthly", label: "Bi-monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "biannual", label: "Bi-annual" },
  { value: "annual", label: "Annual" },
];

interface JournalFormProps {
  journal?: Journal;
  mode: "create" | "edit";
}

export function JournalForm({ journal, mode }: JournalFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    journal?.cover_image_url || null,
  );

  const form = useForm({
    resolver: zodResolver(journalFormSchema),
    defaultValues: journal
      ? {
          title: journal.title,
          short_title: journal.short_title || "",
          issn: journal.issn || "",
          e_issn: journal.e_issn || "",
          description: journal.description,
          scope: journal.scope || "",
          publisher_name: journal.publisher_name || "",
          frequency: journal.frequency,
          established_year: journal.established_year || undefined,
          language: journal.language || "English",
          about_journal: journal.about_journal || "",
          ethics_policies: journal.ethics_policies || "",
          writing_formatting: journal.writing_formatting || "",
          submitting_manuscript: journal.submitting_manuscript || "",
          help_support: journal.help_support || "",
          contact_email: journal.contact_email || "",
          contact_phone: journal.contact_phone || "",
          contact_address: journal.contact_address || "",
          website: journal.website || "",
          doi_prefix: journal.doi_prefix || "",
          is_active: journal.is_active,
          is_open_access: journal.is_open_access,
          peer_reviewed: journal.peer_reviewed,
        }
      : {
          title: "",
          short_title: "",
          issn: "",
          e_issn: "",
          description: "",
          scope: "",
          publisher_name: "",
          frequency: "quarterly",
          language: "English",
          about_journal: "",
          ethics_policies: "",
          writing_formatting: "",
          submitting_manuscript: "",
          help_support: "",
          contact_email: "",
          contact_phone: "",
          contact_address: "",
          website: "",
          doi_prefix: "",
          is_active: true,
          is_open_access: false,
          peer_reviewed: true,
        },
  });

  const createMutation = useMutation({
    mutationFn: createJournal,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      toast.success("Journal created successfully");
      router.push(`/institution/journals/${data.journal.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create journal");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<JournalFormSchema>) =>
      updateJournal(journal!.id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
      queryClient.invalidateQueries({ queryKey: ["journal", journal!.id] });
      toast.success("Journal updated successfully");
      router.push(`/institution/journals/${journal!.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update journal");
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

  const onSubmit = (data: JournalFormSchema) => {
    if (mode === "create") {
      createMutation.mutate(data as any);
    } else {
      updateMutation.mutate(data);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              {mode === "create" ? "Create Journal" : "Edit Journal"}
            </h1>
            <p className="text-text-gray mt-1">
              {mode === "create"
                ? "Add a new journal to your institution"
                : "Update journal information"}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {mode === "create" ? "Create Journal" : "Save Changes"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="publication">Publication</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about your journal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormInputField
                  control={form.control}
                  name="title"
                  label="Journal Title"
                  placeholder="International Journal of..."
                />

                <FormInputField
                  control={form.control}
                  name="short_title"
                  label="Short Title"
                  placeholder="IJAR"
                />

                <FormTextareaField
                  control={form.control}
                  name="description"
                  label="Description"
                  placeholder="Brief description of the journal"
                />

                <FormTextareaField
                  control={form.control}
                  name="scope"
                  label="Scope & Aims"
                  placeholder="Detailed scope and aims of the journal"
                />

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="flex items-start gap-4">
                    {coverImagePreview ? (
                      <div className="relative">
                        <img
                          src={coverImagePreview}
                          alt="Cover preview"
                          className="h-32 w-32 object-cover rounded-md border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2"
                          onClick={removeCoverImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="h-32 w-32 border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Upload a cover image (max 5MB, JPG, PNG, or WebP)
                      </p>
                      {form.formState.errors.cover_image && (
                        <p className="text-sm text-red-500 mt-1">
                          {form.formState.errors.cover_image.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publication Details</CardTitle>
                <CardDescription>
                  Information about publication and indexing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormInputField
                    control={form.control}
                    name="issn"
                    label="ISSN"
                    placeholder="1234-5678"
                  />

                  <FormInputField
                    control={form.control}
                    name="e_issn"
                    label="E-ISSN"
                    placeholder="9876-5432"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormInputField
                    control={form.control}
                    name="publisher_name"
                    label="Publisher Name"
                    placeholder="Academic Press"
                  />

                  <FormSelectField
                    control={form.control}
                    name="frequency"
                    label="Publication Frequency"
                    options={frequencyOptions}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormInputField
                    control={form.control}
                    name="established_year"
                    label="Established Year"
                    type="number"
                    placeholder="2020"
                  />

                  <FormInputField
                    control={form.control}
                    name="language"
                    label="Primary Language"
                    placeholder="English"
                  />
                </div>

                <FormInputField
                  control={form.control}
                  name="doi_prefix"
                  label="DOI Prefix"
                  placeholder="10.1234"
                />

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...form.register("is_open_access")}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Open Access</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...form.register("peer_reviewed")}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Peer Reviewed</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...form.register("is_active")}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Guidelines & Policies</CardTitle>
                <CardDescription>
                  Author guidelines and journal policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormTextareaField
                  control={form.control}
                  name="about_journal"
                  label="About the Journal"
                  placeholder="Detailed information about the journal..."
                />

                <FormTextareaField
                  control={form.control}
                  name="ethics_policies"
                  label="Ethics & Editorial Policies"
                  placeholder="Publication ethics and editorial policies..."
                />

                <FormTextareaField
                  control={form.control}
                  name="writing_formatting"
                  label="Writing & Formatting Guidelines"
                  placeholder="Guidelines for writing and formatting manuscripts..."
                />

                <FormTextareaField
                  control={form.control}
                  name="submitting_manuscript"
                  label="Manuscript Submission Guidelines"
                  placeholder="Instructions for submitting manuscripts..."
                />

                <FormTextareaField
                  control={form.control}
                  name="help_support"
                  label="Help & Support"
                  placeholder="Help and support information..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How to reach the journal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormInputField
                  control={form.control}
                  name="contact_email"
                  label="Contact Email"
                  type="email"
                  placeholder="editor@journal.com"
                />

                <FormInputField
                  control={form.control}
                  name="contact_phone"
                  label="Contact Phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                />

                <FormTextareaField
                  control={form.control}
                  name="contact_address"
                  label="Contact Address"
                  placeholder="Full postal address"
                />

                <FormInputField
                  control={form.control}
                  name="website"
                  label="Journal Website"
                  type="url"
                  placeholder="https://journal.example.com"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Form Actions */}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? "Saving..."
              : mode === "create"
                ? "Create Journal"
                : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
