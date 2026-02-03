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

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  overview: z.string().min(1, "Overview is required"),
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
    },
  });

  const updateMutation = useUpdateSupportPageMutation(data.id, pageType);

  const onSubmit = (formData: FormData) => {
    updateMutation.mutate(formData);
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
      <PricingTiersManager
        pageId={data.id}
        pageType={pageType}
        tiers={data.pricing_tiers}
      />

      {/* Why Support Points */}
      <WhySupportManager
        pageId={data.id}
        pageType={pageType}
        points={data.why_support_points}
      />

      {/* Benefits */}
      <BenefitsManager
        pageId={data.id}
        pageType={pageType}
        benefits={data.benefits}
      />
    </div>
  );
}
