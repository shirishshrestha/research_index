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
import { FormRichTextField } from "@/components/form/FormRichTextField";
import { useUpdateSupportPageMutation } from "@/features/general/support/mutations";
import type { SupportPage } from "@/features/general/support/types";
import { PricingTiersManager } from "./PricingTiersManager";
import { BenefitsManager } from "./BenefitsManager";
import { WhySupportManager } from "./WhySupportManager";
import { SponsorsManager } from "./SponsorsManager";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  overview: z.string().min(1, "Overview is required"),
  sponsorship_detail: z.string().optional(),
  partnership_detail: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface SupportPageEditorProps {
  data: SupportPage;
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership";
}

export function SupportPageEditor({ data, pageType }: SupportPageEditorProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data.title,
      overview: data.overview,
      sponsorship_detail: data.sponsorship_detail || "",
      partnership_detail: data.partnership_detail || "",
    },
  });

  const updateMutation = useUpdateSupportPageMutation(data.id, pageType);

  const onSubmit = (formData: FormData) => {
    const sponsor_data = {
      ...formData,
      page_type: pageType,
    };
    updateMutation.mutate(sponsor_data);
  };

  return (
    <div className="space-y-6">
      {/* Main Content Section */}
      <Card>
        <CardHeader>
          <CardTitle>Page Content</CardTitle>
          <CardDescription>
            Edit the main title and overview content for this support page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInputField
                control={form.control}
                name="title"
                label="Page Title"
              />

              <FormRichTextField
                control={form.control}
                name="overview"
                label="Overview Content"
                placeholder="Write the overview content..."
              />

              {pageType === "sponsorship_partnership" && (
                <>
                  <FormRichTextField
                    control={form.control}
                    name="sponsorship_detail"
                    label="Sponsorship Details"
                    placeholder="Write sponsorship benefits and details (supports HTML)..."
                  />

                  <FormRichTextField
                    control={form.control}
                    name="partnership_detail"
                    label="Partnership Details"
                    placeholder="Write partnership benefits and details (supports HTML)..."
                  />
                </>
              )}

              <div className="flex gap-2">
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Pricing Tiers */}
      {pageType !== "sponsorship_partnership" && (
        <PricingTiersManager
          pageId={data.id}
          pageType={pageType}
          tiers={data.pricing_tiers}
        />
      )}

      {/* Why Support Points */}
      {pageType !== "sponsorship_partnership" && (
        <WhySupportManager
          pageId={data.id}
          pageType={pageType}
          points={data.why_support_points}
        />
      )}

      {pageType !== "sponsorship_partnership" && (
        <BenefitsManager
          pageId={data.id}
          pageType={pageType}
          benefits={data.benefits}
        />
      )}

      {/* Sponsors */}
      <SponsorsManager />
    </div>
  );
}
