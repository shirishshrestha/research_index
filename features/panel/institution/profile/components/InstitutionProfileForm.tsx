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
} from "@/components/form";
import { Save, X } from "lucide-react";
import { InstitutionProfile } from "../types";
import {
  institutionProfileSchema,
  InstitutionProfileFormData,
} from "../schema";
import { revalidateInstitutionProfileAction } from "../actions";
import { usePatch } from "@/hooks/useApi";

const institutionTypeOptions = [
  { value: "University", label: "University" },
  { value: "Research Institute", label: "Research Institute" },
  { value: "College", label: "College" },
  { value: "Laboratory", label: "Laboratory" },
  { value: "Hospital", label: "Hospital" },
  { value: "Government Agency", label: "Government Agency" },
  { value: "Private Company", label: "Private Company" },
  { value: "Non-Profit Organization", label: "Non-Profit Organization" },
  { value: "Other", label: "Other" },
];

interface InstitutionProfileFormProps {
  profile: InstitutionProfile;
  onCancel: () => void;
  onSuccess: () => void;
}

export function InstitutionProfileForm({
  profile,
  onCancel,
  onSuccess,
}: InstitutionProfileFormProps) {
  const router = useRouter();

  const form = useForm<InstitutionProfileFormData>({
    resolver: zodResolver(institutionProfileSchema),
    defaultValues: {
      institution_name: profile.institution_name || "",
      institution_type:
        (profile.institution_type as
          | ""
          | "Other"
          | "University"
          | "Research Institute"
          | "Company") || "",
      description: profile.description || "",
      address: profile.address || "",
      city: profile.city || "",
      state: profile.state || "",
      country: profile.country || "",
      postal_code: profile.postal_code || "",
      phone: profile.phone || "",
      website: profile.website || "",
      established_year: profile.established_year?.toString() || "",
      research_areas: profile.research_areas || "",
      total_researchers: profile.total_researchers?.toString() || "",
    },
  });

  /**
   * TanStack Query mutation using usePatch hook
   */
  const updateMutation = usePatch<
    InstitutionProfile,
    InstitutionProfileFormData
  >("/auth/profile/institution/", {
    onSuccess: async () => {
      await revalidateInstitutionProfileAction();
      toast.success("Profile updated successfully");
      onSuccess();
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const onSubmit = (data: InstitutionProfileFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Edit Institution Profile</h2>
          <p className="text-muted-foreground">
            Update your institution information
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>

            <FormInputField
              control={form.control}
              name="institution_name"
              label="Institution Name *"
              placeholder="Enter institution name"
            />

            <FormSelectField
              control={form.control}
              name="institution_type"
              label="Institution Type"
              placeholder="Select institution type"
              options={institutionTypeOptions}
            />

            <FormTextareaField
              control={form.control}
              name="description"
              label="Description"
              placeholder="Brief description of your institution"
              description="Provide a brief overview of your institution"
              className="min-h-25"
            />

            <FormInputField
              control={form.control}
              name="established_year"
              label="Established Year"
              type="number"
              placeholder="e.g., 1990"
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>

            <FormInputField
              control={form.control}
              name="address"
              label="Address"
              placeholder="Street address"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputField
                control={form.control}
                name="city"
                label="City"
                placeholder="City"
              />

              <FormInputField
                control={form.control}
                name="state"
                label="State/Province"
                placeholder="State or Province"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInputField
                control={form.control}
                name="country"
                label="Country"
                placeholder="Country"
              />

              <FormInputField
                control={form.control}
                name="postal_code"
                label="Postal Code"
                placeholder="Postal/ZIP code"
              />
            </div>

            <FormInputField
              control={form.control}
              name="phone"
              label="Phone"
              type="tel"
              placeholder="+1 234 567 8900"
            />

            <FormInputField
              control={form.control}
              name="website"
              label="Website"
              type="url"
              placeholder="https://example.com"
            />
          </div>

          {/* Research Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Research Information</h3>

            <FormTextareaField
              control={form.control}
              name="research_areas"
              label="Research Areas"
              placeholder="Main research areas and focus"
              description="List the main research areas and focus of your institution"
              className="min-h-20"
            />

            <FormInputField
              control={form.control}
              name="total_researchers"
              label="Total Researchers"
              type="number"
              placeholder="Number of researchers"
              description="Approximate number of researchers at your institution"
            />
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
