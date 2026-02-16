"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
  FormInputField,
  FormTextareaField,
  FormSelectField,
  FormMultiSelectField,
} from "@/components/form";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormLabel } from "@/components/ui/form";
import type { EditorialBoardMember } from "../types";
import {
  useCreateEditorialBoardMemberMutation,
  useUpdateEditorialBoardMemberMutation,
  useExpertiseAreasQuery,
} from "../hooks";
import {
  editorialBoardMemberSchema,
  titleOptions,
  ROLE_OPTIONS,
  type EditorialBoardMemberFormData,
} from "../schemas";

interface EditorialBoardMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  journalId: number;
  member?: EditorialBoardMember;
  mode: "create" | "edit";
}

export function EditorialBoardMemberDialog({
  open,
  onOpenChange,
  journalId,
  member,
  mode,
}: EditorialBoardMemberDialogProps) {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Fetch expertise areas
  const { data: expertiseAreas = [], isLoading: isLoadingExpertise } =
    useExpertiseAreasQuery();

  const form = useForm({
    resolver: zodResolver(editorialBoardMemberSchema),
    defaultValues: {
      name: "",
      role: "",
      title: "",
      affiliation: "",
      email: "",
      bio: "",
      expertise: [],
      orcid: "",
      website: "",
      order: 0,
      is_active: true,
    },
  });

  const createMutation = useCreateEditorialBoardMemberMutation(journalId);
  const updateMutation = useUpdateEditorialBoardMemberMutation(
    journalId,
    member?.id ?? 0,
  );

  // Reset form and photo states when dialog opens/closes or mode changes
  useEffect(() => {
    if (!open) return;

    if (member && mode === "edit") {
      // Parse expertise if it's a string
      let expertiseArray: string[] = [];
      if (member.expertise) {
        try {
          // Try to parse as JSON first
          expertiseArray =
            typeof member.expertise === "string"
              ? JSON.parse(member.expertise)
              : member.expertise;
        } catch {
          // If parsing fails, split by comma
          expertiseArray =
            typeof member.expertise === "string"
              ? member.expertise.split(",").map((s) => s.trim())
              : [];
        }
      }

      form.reset({
        name: member.name,
        role: member.role,
        title: member.title || "",
        affiliation: member.affiliation || "",
        email: member.email || "",
        bio: member.bio || "",
        expertise: expertiseArray,
        orcid: member.orcid || "",
        website: member.website || "",
        order: member.order,
        is_active: member.is_active,
      });
      // Use queueMicrotask to avoid cascading setState
      queueMicrotask(() => {
        setPhotoPreview(member.photo_url || null);
        setPhotoFile(null);
      });
    } else if (mode === "create") {
      form.reset({
        name: "",
        role: "",
        title: "",
        affiliation: "",
        email: "",
        bio: "",
        expertise: [],
        orcid: "",
        website: "",
        order: 0,
        is_active: true,
      });
      queueMicrotask(() => {
        setPhotoPreview(null);
        setPhotoFile(null);
      });
    }
  }, [open, member, mode, form]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    // Reset to original photo if editing, otherwise null
    setPhotoPreview(
      mode === "edit" && member?.photo_url ? member.photo_url : null,
    );
  };

  const onSubmit = (data: EditorialBoardMemberFormData) => {
    const payload: Record<string, unknown> = {
      ...data,
      // Convert expertise array to comma-separated string for backend
      expertise: data.expertise?.join(", ") || "",
    };

    if (photoFile) {
      payload.photo = photoFile;
    }

    if (mode === "create") {
      createMutation.mutate(
        payload as EditorialBoardMemberFormData & { photo?: File },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        },
      );
    } else {
      updateMutation.mutate(payload, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  const isLoading =
    createMutation.isPending || updateMutation.isPending || isLoadingExpertise;

  // Convert expertise areas to options format
  const expertiseOptions =
    expertiseAreas.map((area) => ({
      value: area.name,
      label: area.name,
    })) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-3xl! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Add Editorial Board Member"
              : "Edit Editorial Board Member"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new member to the editorial board"
              : "Update editorial board member information"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Photo Upload */}
            <div className="space-y-2">
              <FormLabel>Photo</FormLabel>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={photoPreview || undefined} />
                  <AvatarFallback>
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("photo-upload")?.click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  {photoPreview && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemovePhoto}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  )}
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormInputField
                control={form.control}
                name="name"
                label="Full Name *"
                placeholder="Dr. John Doe"
              />

              <FormSelectField
                control={form.control}
                name="role"
                label="Role *"
                placeholder="Select a role"
                options={ROLE_OPTIONS}
              />

              <FormSelectField
                control={form.control}
                name="title"
                label="Academic Title"
                placeholder="Select title"
                options={titleOptions}
              />

              <FormInputField
                control={form.control}
                name="email"
                type="email"
                label="Email"
                placeholder="john.doe@example.com"
              />
            </div>

            <FormInputField
              control={form.control}
              name="affiliation"
              label="Affiliation"
              placeholder="University or Institution"
            />

            <FormTextareaField
              control={form.control}
              name="bio"
              label="Biography"
              placeholder="Short biography..."
              rows={3}
            />

            <FormMultiSelectField
              control={form.control}
              name="expertise"
              label="Areas of Expertise"
              placeholder="Select expertise areas"
              options={expertiseOptions}
              search={{
                placeholder: "Search expertise areas...",
                emptyMessage: "No expertise areas found.",
              }}
            />

            {/* External Links */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormInputField
                control={form.control}
                name="orcid"
                label="ORCID ID"
                placeholder="0000-0000-0000-0000"
              />

              <FormInputField
                control={form.control}
                name="website"
                type="url"
                label="Website"
                placeholder="https://example.com"
              />
            </div>

            <FormInputField
              control={form.control}
              name="order"
              type="number"
              label="Display Order"
              placeholder="0"
            />

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "create" ? "Add Member" : "Update Member"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
