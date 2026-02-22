"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { FormTextareaField } from "@/components/form/FormTextareaField";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
  useCreateBenefitMutation,
  useDeleteBenefitMutation,
} from "@/features/general/support/mutations";
import type { SupportBenefit } from "@/features/general/support/types";
import { Plus, Trash2 } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  order: z.number().min(0),
});

type FormData = z.infer<typeof schema>;

interface BenefitsManagerProps {
  pageId: number;
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership";
  benefits: SupportBenefit[];
}

function BenefitForm({
  pageId,
  pageType,
  onSuccess,
}: {
  pageId: number;
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership";
  onSuccess: () => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      order: 0,
    },
  });

  const createMutation = useCreateBenefitMutation(pageId, pageType);

  const onSubmit = (data: FormData) => {
    createMutation.mutate(data, { onSuccess });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInputField
          control={form.control}
          name="title"
          label="Benefit Title"
          placeholder="Enter benefit title"
        />
        <FormTextareaField
          control={form.control}
          name="description"
          label="Description"
          placeholder="Describe this benefit"
        />
        <FormInputField
          control={form.control}
          name="order"
          label="Display Order"
          type="number"
        />
        <DialogFooter>
          <Button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function BenefitsManager({
  pageId,
  pageType,
  benefits,
}: BenefitsManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [benefitToDelete, setBenefitToDelete] = useState<number | null>(null);
  const deleteMutation = useDeleteBenefitMutation(pageId, pageType);

  const handleDeleteClick = (benefitId: number) => {
    setBenefitToDelete(benefitId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (benefitToDelete) {
      deleteMutation.mutate(benefitToDelete);
      setDeleteDialogOpen(false);
      setBenefitToDelete(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Benefits</CardTitle>
            <CardDescription>
              Manage benefits for supporters on this page.
            </CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Benefit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Benefit</DialogTitle>
                <DialogDescription>
                  Create a new benefit for this support page.
                </DialogDescription>
              </DialogHeader>
              <BenefitForm
                pageId={pageId}
                pageType={pageType}
                onSuccess={() => setDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {benefit.description}
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDeleteClick(benefit.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
          {benefits.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No benefits yet. Click &apos;Add Benefit&apos; to create one.
            </p>
          )}
        </div>
      </CardContent>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this benefit? This action cannot
              be undone.
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
