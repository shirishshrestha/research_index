"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  FormInputField,
  FormTextareaField,
  FormSelectField,
  FormTagInputField,
  FormImageUploadField,
} from "@/components/form";
import { Save, X } from "lucide-react";
import { usePatch } from "@/hooks/useApi";
import { authorProfileSchema, type AuthorProfileFormData } from "../schema";
import type { AuthorProfile } from "../types";
import { revalidateAuthorProfileAction } from "../server-actions/actions";

interface AuthorProfileFormProps {
  profile: AuthorProfile;
  onCancel: () => void;
  onSuccess: () => void;
}

const titleOptions = [
  { value: "Dr.", label: "Dr." },
  { value: "Prof.", label: "Prof." },
  { value: "Mr.", label: "Mr." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Ms.", label: "Ms." },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export function AuthorProfileForm({
  profile,
  onCancel,
  onSuccess,
}: AuthorProfileFormProps) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(authorProfileSchema),
    defaultValues: {
      title:
        (profile.title as "" | "Dr." | "Prof." | "Mr." | "Mrs." | "Ms.") || "",
      full_name: profile.full_name || "",
      institute: profile.institute || "",
      designation: profile.designation || "",
      degree: profile.degree || "",
      gender: (profile.gender as "" | "Male" | "Female" | "Other") || "",
      bio: profile.bio || "",
      research_interests: Array.isArray(profile.research_interests)
        ? profile.research_interests
        : profile.research_interests
          ? (profile.research_interests as string)
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
      orcid: profile.orcid || "",
      google_scholar: profile.google_scholar || "",
      researchgate: profile.researchgate || "",
      linkedin: profile.linkedin || "",
      website: profile.website || "",
      profile_picture: undefined,
      cv: undefined,
    },
  });

  /**
   * Use reusable usePatch hook from useApi.ts
   * Flow: axios PATCH → revalidate Server Action → router.refresh()
   */
  const updateMutation = usePatch<AuthorProfile, FormData>(
    "/auth/profile/author/",
    {
      onSuccess: async () => {
        // Revalidate server cache
        await revalidateAuthorProfileAction();

        toast.success("Profile updated successfully");
        onSuccess();

        // Trigger Server Component refetch
        router.refresh();
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to update profile");
      },
    },
  );

  const onSubmit = (data: AuthorProfileFormData) => {
    // Convert to FormData for file uploads
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        // Convert array to comma-separated string
        formData.append(key, value.join(", "));
      } else if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    updateMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Edit Author Profile</h2>
          <p className="text-muted-foreground">
            Update your profile information
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={updateMutation.isPending}
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Basic Information
            </h3>

            {/* Profile Picture Upload */}
            <FormImageUploadField
              control={form.control}
              name="profile_picture"
              label="Profile Picture"
              description="Upload your profile picture (Max 5MB, JPG/PNG)"
              currentImageUrl={profile.profile_picture_url || undefined}
              aspectRatio="circle"
              maxSize={5}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelectField
                control={form.control}
                name="title"
                label="Title"
                placeholder="Select title"
                options={titleOptions}
              />

              <FormInputField
                control={form.control}
                name="full_name"
                label="Full Name *"
                placeholder="John Doe"
              />

              <FormInputField
                control={form.control}
                name="institute"
                label="Institute *"
                placeholder="Your institution"
              />

              <FormInputField
                control={form.control}
                name="designation"
                label="Designation *"
                placeholder="Professor, Research Scientist, etc."
              />

              <FormInputField
                control={form.control}
                name="degree"
                label="Degree"
                placeholder="PhD, MSc, etc."
              />

              <FormSelectField
                control={form.control}
                name="gender"
                label="Gender"
                placeholder="Select gender"
                options={genderOptions}
              />
            </div>
          </div>

          {/* About Section */}
          <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">About</h3>

            <FormTextareaField
              control={form.control}
              name="bio"
              label="Bio"
              placeholder="Tell us about yourself..."
              description="A brief description of your background and expertise"
              className="min-h-30"
              maxLength={1000}
              showCounter
            />

            <FormTagInputField
              control={form.control}
              name="research_interests"
              label="Research Interests"
              placeholder="Type and press Enter to add research interests"
              description="Add your main research areas (press Enter after each tag)"
              maxLength={50}
            />
          </div>

          {/* Academic Links */}
          <div className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Academic & Social Links
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputField
                control={form.control}
                name="orcid"
                label="ORCID"
                placeholder="0000-0000-0000-0000"
                description="Your ORCID identifier"
              />

              <FormInputField
                control={form.control}
                name="google_scholar"
                label="Google Scholar"
                type="url"
                placeholder="https://scholar.google.com/citations?user=..."
              />

              <FormInputField
                control={form.control}
                name="researchgate"
                label="ResearchGate"
                type="url"
                placeholder="https://www.researchgate.net/profile/..."
              />

              <FormInputField
                control={form.control}
                name="linkedin"
                label="LinkedIn"
                type="url"
                placeholder="https://www.linkedin.com/in/..."
              />

              <div className="md:col-span-2">
                <FormInputField
                  control={form.control}
                  name="website"
                  label="Personal Website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
