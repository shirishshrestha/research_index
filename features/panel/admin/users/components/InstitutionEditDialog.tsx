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
import { FormSelectField } from "@/components/form/FormSelectField";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { SquarePen } from "lucide-react";
import { useAdminInstitutionDetailQuery } from "../hooks/queries";
import { useUpdateInstitutionMutation } from "../hooks/mutations";
import type { InstitutionUpdateData } from "../types";

const INSTITUTION_TYPE_OPTIONS = [
  { label: "University", value: "university" },
  { label: "Research Institute", value: "research_institute" },
  { label: "Government Organization", value: "government" },
  { label: "Private Research Organization", value: "private" },
  { label: "Industry/Corporate R&D", value: "industry" },
  { label: "Hospital/Medical Center", value: "hospital" },
  { label: "Other", value: "other" },
];

export function InstitutionEditDialog({
  institutionId,
}: {
  institutionId: number;
}) {
  const [open, setOpen] = React.useState(false);
  const { data: institution, isPending: loading } =
    useAdminInstitutionDetailQuery(open ? institutionId : undefined);

  const form = useForm<InstitutionUpdateData>({
    defaultValues: {
      email: "",
      is_active: true,
      institution_name: "",
      institution_type: "",
      description: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      phone: "",
      website: "",
      established_year: undefined,
      research_areas: "",
      total_researchers: undefined,
    },
  });

  React.useEffect(() => {
    if (institution) {
      form.reset({
        email: institution.email || "",
        is_active: institution.is_active,
        institution_name: institution.institution_name || "",
        institution_type: institution.institution_type || "",
        description: institution.description || "",
        address: institution.address || "",
        city: institution.city || "",
        state: institution.state || "",
        country: institution.country || "",
        postal_code: institution.postal_code || "",
        phone: institution.phone || "",
        website: institution.website || "",
        established_year: institution.established_year || undefined,
        research_areas: institution.research_areas || "",
        total_researchers: institution.total_researchers || undefined,
      });
    }
  }, [institution, form]);

  const update = useUpdateInstitutionMutation(institutionId, {
    onSuccess: () => {
      setOpen(false);
    },
  });

  const onSubmit = (data: InstitutionUpdateData) => {
    update.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" title="Edit institution">
          <SquarePen className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="ms:max-w-[60%]! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Institution</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="grid gap-4">
            {/* Account Information Skeleton */}
            <div className="grid gap-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-10 w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-11 rounded-full" />
              </div>
            </div>

            {/* Basic Information Skeleton */}
            <div className="grid gap-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>

            {/* Contact & Location Skeleton */}
            <div className="grid gap-4">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Research Information Skeleton */}
            <div className="grid gap-4">
              <Skeleton className="h-5 w-48" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-20 w-full" />
            </div>

            {/* Footer Skeleton */}
            <div className="flex justify-end gap-2 pt-4">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              {/* Account Information */}
              <div className="grid gap-4">
                <h3 className="text-sm font-semibold">Account Information</h3>
                <FormInputField
                  control={form.control}
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="institution@example.com"
                />
                <div className="flex items-center justify-between">
                  <Label>Account Status</Label>
                  <Switch
                    checked={form.watch("is_active")}
                    onCheckedChange={(checked) =>
                      form.setValue("is_active", checked)
                    }
                  />
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid gap-4">
                <h3 className="text-sm font-semibold">Basic Information</h3>
                <FormInputField
                  control={form.control}
                  name="institution_name"
                  label="Institution Name"
                  placeholder="Example University"
                />
                <FormSelectField
                  control={form.control}
                  name="institution_type"
                  label="Institution Type"
                  options={INSTITUTION_TYPE_OPTIONS}
                  placeholder="Select type"
                />
                <FormTextareaField
                  control={form.control}
                  name="description"
                  label="Description"
                  placeholder="About the institution"
                />
              </div>

              {/* Contact & Location */}
              <div className="grid gap-4">
                <h3 className="text-sm font-semibold">Contact & Location</h3>
                <FormTextareaField
                  control={form.control}
                  name="address"
                  label="Address"
                  placeholder="Street address"
                />
                <div className="grid grid-cols-2 gap-4">
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
                    placeholder="State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                    placeholder="00000"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInputField
                    control={form.control}
                    name="phone"
                    label="Phone"
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
              </div>

              {/* Research Information */}
              <div className="grid gap-4">
                <h3 className="text-sm font-semibold">Research Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormInputField
                    control={form.control}
                    name="established_year"
                    label="Established Year"
                    type="number"
                    placeholder="2000"
                  />
                  <FormInputField
                    control={form.control}
                    name="total_researchers"
                    label="Total Researchers"
                    type="number"
                    placeholder="100"
                  />
                </div>
                <FormTextareaField
                  control={form.control}
                  name="research_areas"
                  label="Research Areas"
                  placeholder="Main research areas"
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={update.isPending}>
                  {update.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
