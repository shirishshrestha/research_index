"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import { createEditorialBoardMember, updateEditorialBoardMember } from "../api";
import type { EditorialBoardMember } from "../types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ROLE_OPTIONS = [
  { value: "editor_in_chief", label: "Editor-in-Chief" },
  { value: "managing_editor", label: "Managing Editor" },
  { value: "associate_editor", label: "Associate Editor" },
  { value: "section_editor", label: "Section Editor" },
  { value: "editorial_board", label: "Editorial Board Member" },
  { value: "reviewer", label: "Reviewer" },
  { value: "advisory_board", label: "Advisory Board Member" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(1, "Please select a role"),
  title: z.string().optional(),
  affiliation: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  bio: z.string().optional(),
  expertise: z.string().optional(),
  orcid: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  order: z.number().min(0).default(0),
  is_active: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

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
  const queryClient = useQueryClient();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      title: "",
      affiliation: "",
      email: "",
      bio: "",
      expertise: "",
      orcid: "",
      website: "",
      order: 0,
      is_active: true,
    },
  });

  // Reset form and photo states when dialog opens/closes or mode changes
  useEffect(() => {
    if (!open) return;

    if (member && mode === "edit") {
      form.reset({
        name: member.name,
        role: member.role,
        title: member.title || "",
        affiliation: member.affiliation || "",
        email: member.email || "",
        bio: member.bio || "",
        expertise: member.expertise || "",
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
        expertise: "",
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

  const createMutation = useMutation({
    mutationFn: (data: FormData & { photo?: File }) =>
      createEditorialBoardMember(journalId, data),
    onSuccess: (data) => {
      toast.success(
        data.message || "Editorial board member added successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["journal", journalId] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add editorial board member");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<FormData> & { photo?: File }) =>
      updateEditorialBoardMember(journalId, member!.id, data),
    onSuccess: (data) => {
      toast.success(
        data.message || "Editorial board member updated successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["journal", journalId] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update editorial board member");
    },
  });

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

  const onSubmit = (data: FormData) => {
    const payload: Record<string, unknown> = { ...data };
    if (photoFile) {
      payload.photo = photoFile;
    }

    if (mode === "create") {
      createMutation.mutate(payload as FormData & { photo?: File });
    } else {
      updateMutation.mutate(payload);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Dr., Prof." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="affiliation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Affiliation</FormLabel>
                  <FormControl>
                    <Input placeholder="University or Institution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biography</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short biography..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expertise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Areas of Expertise</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Research areas and expertise..."
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* External Links */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="orcid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ORCID ID</FormLabel>
                    <FormControl>
                      <Input placeholder="0000-0000-0000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
