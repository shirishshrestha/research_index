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
  useCreatePricingTierMutation,
  useUpdatePricingTierMutation,
  useDeletePricingTierMutation,
} from "@/features/general/support/mutations";
import type { PricingTier } from "@/features/general/support/types";
import { Plus, Pencil, Trash2 } from "lucide-react";

const schema = z.object({
  category: z.string().min(1, "Category is required"),
  npr_amount: z.string().min(1, "NPR amount is required"),
  usd_amount: z.string().min(1, "USD amount is required"),
  purpose: z.string().min(1, "Purpose is required"),
  order: z.number().min(0),
});

type FormData = z.infer<typeof schema>;

interface PricingTiersManagerProps {
  pageId: number;
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership";
  tiers: PricingTier[];
}

function PricingTierForm({
  pageId,
  pageType,
  tier,
  onSuccess,
}: {
  pageId: number;
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership";
  tier?: PricingTier;
  onSuccess: () => void;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: tier?.category || "",
      npr_amount: tier?.npr_amount || "",
      usd_amount: tier?.usd_amount || "",
      purpose: tier?.purpose || "",
      order: tier?.order || 0,
    },
  });

  const createMutation = useCreatePricingTierMutation(pageId, pageType);
  const updateMutation = useUpdatePricingTierMutation(
    pageId,
    tier?.id || 0,
    pageType,
  );

  const onSubmit = (data: FormData) => {
    if (tier) {
      updateMutation.mutate(data, { onSuccess });
    } else {
      createMutation.mutate(data, { onSuccess });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInputField
          control={form.control}
          name="category"
          label="Category"
          placeholder="e.g., Senior Researcher / Professor"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInputField
            control={form.control}
            name="npr_amount"
            label="NPR Amount"
            placeholder="e.g., 10,000"
          />
          <FormInputField
            control={form.control}
            name="usd_amount"
            label="USD Amount"
            placeholder="e.g., 75"
          />
        </div>
        <FormInputField
          control={form.control}
          name="purpose"
          label="Purpose"
          placeholder="Describe the purpose of this tier"
        />
        <FormInputField
          control={form.control}
          name="order"
          label="Display Order"
          type="number"
        />
        <DialogFooter>
          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {createMutation.isPending || updateMutation.isPending
              ? "Saving..."
              : tier
                ? "Update"
                : "Create"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function PricingTiersManager({
  pageId,
  pageType,
  tiers,
}: PricingTiersManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<PricingTier | undefined>();
  const deleteMutation = useDeletePricingTierMutation(pageId, pageType);

  const handleDelete = (tierId: number) => {
    if (confirm("Are you sure you want to delete this pricing tier?")) {
      deleteMutation.mutate(tierId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pricing Tiers</CardTitle>
            <CardDescription>
              Manage pricing tiers for this support page.
            </CardDescription>
          </div>
          <Dialog
            open={dialogOpen}
            onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) setEditingTier(undefined);
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Tier
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingTier ? "Edit Pricing Tier" : "Add Pricing Tier"}
                </DialogTitle>
                <DialogDescription>
                  {editingTier
                    ? "Update the pricing tier information."
                    : "Create a new pricing tier for this support page."}
                </DialogDescription>
              </DialogHeader>
              <PricingTierForm
                pageId={pageId}
                pageType={pageType}
                tier={editingTier}
                onSuccess={() => setDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="flex items-start justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{tier.category}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  NPR {tier.npr_amount} / USD ${tier.usd_amount}
                </p>
                <p className="text-sm text-gray-500 mt-2">{tier.purpose}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingTier(tier);
                    setDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(tier.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          {tiers.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No pricing tiers yet. Click "Add Tier" to create one.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
