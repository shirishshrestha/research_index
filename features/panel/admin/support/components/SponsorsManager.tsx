"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/form/FormInputField";
import { FormCheckboxField } from "@/components/form/FormCheckboxField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useSponsorsQuery,
  useCreateSponsorMutation,
  useUpdateSponsorMutation,
  useDeleteSponsorMutation,
} from "@/features/general/support";
import type { Sponsor } from "@/features/general/support/types";
import { Pencil, Trash2, Plus } from "lucide-react";

const sponsorSchema = z.object({
  name: z.string().min(1, "Sponsor name is required"),
  website_url: z.string().url("Invalid URL").or(z.literal("")),
  logo: z.any().optional(),
  is_active: z.boolean(),
  order: z.coerce.number().min(0),
  show_on_author_supporter: z.boolean(),
  show_on_institutional_supporter: z.boolean(),
  show_on_sponsorship_partnership: z.boolean(),
});

type SponsorFormData = z.infer<typeof sponsorSchema>;

interface SponsorDialogProps {
  sponsor?: Sponsor;
  onClose: () => void;
}

function SponsorDialog({ sponsor, onClose }: SponsorDialogProps) {
  const [open, setOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    sponsor?.logo_url || null,
  );

  const form = useForm({
    resolver: zodResolver(sponsorSchema),
    defaultValues: sponsor
      ? {
          name: sponsor.name,
          website_url: sponsor.website_url || "",
          is_active: sponsor.is_active,
          order: sponsor.order,
          show_on_author_supporter: sponsor.show_on_author_supporter,
          show_on_institutional_supporter:
            sponsor.show_on_institutional_supporter,
          show_on_sponsorship_partnership:
            sponsor.show_on_sponsorship_partnership,
        }
      : {
          name: "",
          website_url: "",
          is_active: true,
          order: 0,
          show_on_author_supporter: false,
          show_on_institutional_supporter: false,
          show_on_sponsorship_partnership: false,
        },
  });

  const createMutation = useCreateSponsorMutation();
  const updateMutation = useUpdateSponsorMutation(sponsor?.id || 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SponsorFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("website_url", data.website_url || "");
    formData.append("is_active", String(data.is_active));
    formData.append("order", String(data.order));
    formData.append(
      "show_on_author_supporter",
      String(data.show_on_author_supporter),
    );
    formData.append(
      "show_on_institutional_supporter",
      String(data.show_on_institutional_supporter),
    );
    formData.append(
      "show_on_sponsorship_partnership",
      String(data.show_on_sponsorship_partnership),
    );

    // Only append logo if a new file was selected
    const fileInput =
      document.querySelector<HTMLInputElement>('input[type="file"]');
    if (fileInput?.files?.[0]) {
      formData.append("logo", fileInput.files[0]);
    }

    try {
      if (sponsor) {
        await updateMutation.mutateAsync(formData);
      } else {
        await createMutation.mutateAsync(formData);
      }
      setOpen(false);
      onClose();
      form.reset();
      setLogoPreview(null);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {sponsor ? (
          <Button variant="ghost" size="sm">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Sponsor
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {sponsor ? "Edit Sponsor" : "Add New Sponsor"}
          </DialogTitle>
          <DialogDescription>
            {sponsor
              ? "Update sponsor information and logo"
              : "Add a new sponsor with logo"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputField
              control={form.control}
              name="name"
              label="Sponsor Name"
              placeholder="Enter sponsor name"
            />

            <FormInputField
              control={form.control}
              name="website_url"
              label="Website URL"
              placeholder="https://example.com"
            />

            {/* Logo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Logo</label>
              {logoPreview && (
                <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-primary/90"
              />
              <p className="text-xs text-gray-500">
                Upload a logo image (PNG, JPG, or SVG recommended)
              </p>
            </div>

            <FormInputField
              control={form.control}
              name="order"
              label="Display Order"
              type="number"
              placeholder="0"
            />

            <FormCheckboxField
              control={form.control}
              name="is_active"
              label="Active"
              description="Show this sponsor on the website"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Show on Pages</label>
              <FormCheckboxField
                control={form.control}
                name="show_on_author_supporter"
                label="Author Supporter Page"
              />
              <FormCheckboxField
                control={form.control}
                name="show_on_institutional_supporter"
                label="Institutional Supporter Page"
              />
              <FormCheckboxField
                control={form.control}
                name="show_on_sponsorship_partnership"
                label="Sponsorship & Partnership Page"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : sponsor
                    ? "Update Sponsor"
                    : "Create Sponsor"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function SponsorsManager() {
  const { data: sponsors, isLoading } = useSponsorsQuery();
  const deleteMutation = useDeleteSponsorMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sponsorToDelete, setSponsorToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setSponsorToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (sponsorToDelete) {
      deleteMutation.mutate(sponsorToDelete.id);
      setDeleteDialogOpen(false);
      setSponsorToDelete(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sponsors & Partners</CardTitle>
            <CardDescription>
              Manage sponsor logos and display settings
            </CardDescription>
          </div>
          <SponsorDialog onClose={() => {}} />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-gray-500">Loading sponsors...</p>
        ) : !sponsors || sponsors.results.length === 0 ? (
          <p className="text-gray-500">
            No sponsors yet. Add your first sponsor!
          </p>
        ) : (
          <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sponsors.results.map((sponsor) => (
              <div
                key={sponsor.id}
                className="flex md:items-center justify-between p-4 border rounded-lg flex-col gap-3 md:flex-row md:gap-0"
              >
                <div className="flex items-center gap-4 flex-1">
                  {sponsor.logo_url && (
                    <div className="relative w-16 h-16 border rounded overflow-hidden shrink-0">
                      <Image
                        src={sponsor.logo_url}
                        alt={sponsor.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{sponsor.name}</h3>
                    {sponsor.website_url && (
                      <a
                        href={sponsor.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {sponsor.website_url}
                      </a>
                    )}
                    <div className="flex gap-2 mt-1 text-xs text-gray-600">
                      {sponsor.show_on_author_supporter && (
                        <span className="bg-blue-100 px-2 py-0.5 rounded">
                          Author
                        </span>
                      )}
                      {sponsor.show_on_institutional_supporter && (
                        <span className="bg-green-100 px-2 py-0.5 rounded">
                          Institutional
                        </span>
                      )}
                      {sponsor.show_on_sponsorship_partnership && (
                        <span className="bg-purple-100 px-2 py-0.5 rounded">
                          Partnership
                        </span>
                      )}
                      {!sponsor.is_active && (
                        <span className="bg-gray-100 px-2 py-0.5 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <SponsorDialog sponsor={sponsor} onClose={() => {}} />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteClick(sponsor.id, sponsor.name)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete sponsor &apos;
              {sponsorToDelete?.name}&apos;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
