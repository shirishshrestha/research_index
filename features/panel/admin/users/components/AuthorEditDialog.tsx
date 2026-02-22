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
import { useAdminAuthorDetailQuery } from "../hooks/queries";
import { useUpdateAuthorMutation } from "../hooks/mutations";
import type { AuthorUpdateData } from "../types";

const TITLE_OPTIONS = [
  { label: "Dr.", value: "Dr." },
  { label: "Prof.", value: "Prof." },
  { label: "Mr.", value: "Mr." },
  { label: "Ms.", value: "Ms." },
  { label: "Mrs.", value: "Mrs." },
];

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "prefer_not_to_say" },
];

export function AuthorEditDialog({ authorId }: { authorId: number }) {
  const [open, setOpen] = React.useState(false);
  const { data: author, isPending: loading } = useAdminAuthorDetailQuery(
    open ? authorId : undefined,
  );

  const form = useForm<AuthorUpdateData>({
    defaultValues: {
      email: "",
      is_active: true,
      title: "Dr.",
      full_name: "",
      institute: "",
      designation: "",
      degree: "",
      gender: "",
      bio: "",
      research_interests: "",
      orcid: "",
      google_scholar: "",
      researchgate: "",
      linkedin: "",
      website: "",
    },
  });

  React.useEffect(() => {
    if (author) {
      form.reset({
        email: author.email || "",
        is_active: author.is_active,
        title: author.title || "Dr.",
        full_name: author.full_name || "",
        institute: author.institute || "",
        designation: author.designation || "",
        degree: author.degree || "",
        gender: author.gender || "",
        bio: author.bio || "",
        research_interests: author.research_interests || "",
        orcid: author.orcid || "",
        google_scholar: author.google_scholar || "",
        researchgate: author.researchgate || "",
        linkedin: author.linkedin || "",
        website: author.website || "",
      });
    }
  }, [author, form]);

  const update = useUpdateAuthorMutation(authorId, {
    onSuccess: () => {
      setOpen(false);
    },
  });

  const onSubmit = (data: AuthorUpdateData) => {
    update.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" title="Edit author">
          <SquarePen className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[60%]! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Author</DialogTitle>
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

            {/* Research Profile Skeleton */}
            <div className="grid gap-4">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>

            {/* External Links Skeleton */}
            <div className="grid gap-4">
              <Skeleton className="h-5 w-36" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
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
                  placeholder="author@example.com"
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
                <div className="grid grid-cols-2 gap-4">
                  <FormSelectField
                    control={form.control}
                    name="title"
                    label="Title"
                    options={TITLE_OPTIONS}
                  />
                  <FormInputField
                    control={form.control}
                    name="full_name"
                    label="Full Name"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInputField
                    control={form.control}
                    name="institute"
                    label="Institute"
                    placeholder="University Name"
                  />
                  <FormInputField
                    control={form.control}
                    name="designation"
                    label="Designation"
                    placeholder="Professor"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInputField
                    control={form.control}
                    name="degree"
                    label="Degree"
                    placeholder="PhD in Computer Science"
                  />
                  <FormSelectField
                    control={form.control}
                    name="gender"
                    label="Gender"
                    options={GENDER_OPTIONS}
                    placeholder="Select gender"
                  />
                </div>
              </div>

              {/* Research Profile */}
              <div className="grid gap-4">
                <h3 className="text-sm font-semibold">Research Profile</h3>
                <FormTextareaField
                  control={form.control}
                  name="bio"
                  label="Bio"
                  placeholder="Short biography"
                />
                <FormTextareaField
                  control={form.control}
                  name="research_interests"
                  label="Research Interests"
                  placeholder="Research areas and interests"
                />
              </div>

              {/* External Links */}
              <div className="grid gap-4">
                <h3 className="text-sm font-semibold">External Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormInputField
                    control={form.control}
                    name="orcid"
                    label="ORCID"
                    placeholder="0000-0000-0000-0000"
                  />
                  <FormInputField
                    control={form.control}
                    name="google_scholar"
                    label="Google Scholar"
                    type="url"
                    placeholder="https://scholar.google.com/..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInputField
                    control={form.control}
                    name="researchgate"
                    label="ResearchGate"
                    type="url"
                    placeholder="https://www.researchgate.net/..."
                  />
                  <FormInputField
                    control={form.control}
                    name="linkedin"
                    label="LinkedIn"
                    type="url"
                    placeholder="https://www.linkedin.com/..."
                  />
                </div>
                <FormInputField
                  control={form.control}
                  name="website"
                  label="Website"
                  type="url"
                  placeholder="https://example.com"
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
